from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from pydantic import BaseModel
from decimal import Decimal
import sqlite3
from fastapi import Header  # <--- Add this
import os                   # <--- Add this

# Import your engines
from cbam_models import (
    Qreport, DeclarantType, DeclarantAddressType, 
    ImportedGoodType, OriginCountryType, CommodityCodeType,
    CommodityDetailsType, MeasureType, SignaturesType, ReportConfirmationType,
    GoodsEmissionsType, DirectEmissionsType, IndirectEmissionsType
)
from xsdata_pydantic.bindings import XmlSerializer
from xsdata.formats.dataclass.serializers.config import SerializerConfig
from calculator import CarbonCalculator, ElectricityCalculator
from database import init_db, log_report  # Audit Trail Database

app = FastAPI(title="CBAM Compliance API")
# Trigger redeploy: touched by automation to pick up model changes

# Initialize DB on startup
@app.on_event("startup")
def startup_event():
    init_db()

# Enable CORS for React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1. Define the Input Format (What the Frontend sends us)
class FactoryInput(BaseModel):
    company_name: str
    company_id: str
    production_tonnes: float
    coal_tonnes: float
    electricity_kwh: float
    city: str

@app.post("/generate-xml")
async def generate_cbam_report(data: FactoryInput):
    """
    Takes raw factory data -> Returns EU Compliant XML File
    """
    try:
        # --- STEP A: RUN THE CALCULATOR ---
        # 1. Direct Emissions
        fuel_engine = CarbonCalculator()
        fuel_result = fuel_engine.calculate_direct_emissions("Lignite Coal", data.coal_tonnes)
        spec_direct = fuel_engine.calculate_specific_emissions(
            fuel_result["total_co2e"], data.production_tonnes
        )

        # 2. Indirect Emissions
        elec_engine = ElectricityCalculator()
        elec_result = elec_engine.calculate_indirect("Grid", data.electricity_kwh)
        spec_indirect = round(elec_result["total_indirect_co2e"] / data.production_tonnes, 6)

        # --- STEP B: BUILD THE XML ---
        # (This is the same logic as your main.py, but using 'data' variables)
        
        report = Qreport(
            reporting_period="Q4", year=2024,
            declarant=DeclarantType(
                identification_number=data.company_id, # From User Input
                name=data.company_name,                # From User Input
                role="IMP",
                actor_address=DeclarantAddressType(
                    city=data.city, street="Industrial Area", postcode="000000", country="IN"
                )
            ),
            signatures=SignaturesType(
                report_confirmation=ReportConfirmationType(
                    global_data_confirmation=True, use_of_data_confirmation=True,
                    signature_place=data.city, signature="Authorized Signatory",
                    position_of_person_sending="Manager"
                )
            ),
            imported_good=[
                ImportedGoodType(
                    item_number="1",
                    origin_country=OriginCountryType(country="IN"),
                    commodity_code=CommodityCodeType(
                        hs_code="731815", 
                        cn_code="73181510",
                        commodity_details=CommodityDetailsType(
                            description="Steel products"
                        )
                    ),
                    measure_imported=MeasureType(
                        net_mass=Decimal(str(data.production_tonnes * 1000)),  # Convert to kg
                        measurement_unit="KGM"
                    ),
                    goods_emissions=[
                        GoodsEmissionsType(
                            sequence_number="1",
                            production_country="IN",
                            produced_measure=MeasureType(
                                net_mass=Decimal(str(data.production_tonnes * 1000)),  # Convert to kg
                                measurement_unit="KGM"
                            ),
                            direct_emissions=DirectEmissionsType(
                                applicable_reporting_type_methodology="AC",  # AC = Actual Data (max 5 chars per XSD)
                                specific_embedded_emissions=Decimal(str(spec_direct)),
                                measurement_unit="TCO2"
                            ),
                            indirect_emissions=IndirectEmissionsType(
                                determination_type="AC",  # AC = Actual Data (max 5 chars per XSD)
                                specific_embedded_emissions=Decimal(str(spec_indirect)),
                                measurement_unit="TCO2",
                                electricity_consumed=Decimal(str(elec_result["consumption_mwh"])),
                                electricity_source="GRID"
                            )
                        )
                    ]
                )
            ]
        )

        # --- STEP C: SERIALIZE TO XML ---
        config = SerializerConfig(pretty_print=True)
        serializer = XmlSerializer(config=config)
        xml_string = serializer.render(report)

        # --- STEP D: LOG TO GLASS BOX (Audit Trail) ---
        try:
            log_report(data, spec_direct, spec_indirect)
        except Exception as db_error:
            print(f"⚠️ Database Error: {db_error}")
            # In a strict system, you might want to FAIL here if logging fails
            # raise HTTPException(status_code=500, detail="Audit Log Failed")

        # Return as a downloadable file
        return Response(
            content=xml_string,
            media_type="application/xml",
            headers={"Content-Disposition": f"attachment; filename={data.company_name}_CBAM.xml"}
        )

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# --- SECURE ADMIN ROUTE ---
@app.get("/admin/view-vault")
async def view_vault(x_admin_key: str = Header(None)):
    """
    ADMIN ONLY: Protected by Secret Key.
    Requires Header: 'x-admin-key: YOUR_SECRET_PASSWORD'
    """
    # 1. Get the secret from Environment Variables (or use default for localhost)
    # We will set 'ADMIN_SECRET' in Render dashboard later.
    valid_key = os.getenv("ADMIN_SECRET", "123456") 

    # 2. Check the Key
    if x_admin_key != valid_key:
        raise HTTPException(status_code=401, detail="⛔ Unauthorized: Invalid Admin Key")

    # 3. If Valid, Show the Data
    try:
        conn = sqlite3.connect("cbam_audit_trail.db")
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM audit_log ORDER BY id DESC LIMIT 5")
        rows = cursor.fetchall()
        column_names = [description[0] for description in cursor.description]
        results = []
        for row in rows:
            results.append(dict(zip(column_names, row)))
        conn.close()
        return {"status": "Active", "recent_logs": results}

    except Exception as e:
        return {"status": "Error", "message": str(e)}
