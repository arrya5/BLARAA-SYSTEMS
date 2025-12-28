from cbam_models import (
    Qreport, DeclarantType, DeclarantAddressType, 
    ImportedGoodType, OriginCountryType, CommodityCodeType,
    CommodityDetailsType, MeasureType, SignaturesType, ReportConfirmationType,
    # NEW IMPORTS FOR EMISSIONS
    GoodsEmissionsType, DirectEmissionsType, IndirectEmissionsType
)
from decimal import Decimal
from xsdata_pydantic.bindings import XmlSerializer
from xsdata.formats.dataclass.serializers.config import SerializerConfig

# Import your Calculator
from calculator import CarbonCalculator, ElectricityCalculator

def generate_final_report():
    print("🚀 Starting Full Compliance Run...")

    # --- PART 1: THE CALCULATIONS ---
    # Scenario: Factory made 1500 kg of screws.
    # They used: 0.5 Tonnes of Coal AND 200 kWh of Electricity.
    
    production_qty = 1.5  # Tonnes (1500 kg)

    # Calculate Direct (Coal)
    fuel_engine = CarbonCalculator()
    fuel_result = fuel_engine.calculate_direct_emissions("Lignite Coal", 0.5)
    # Specific Direct = Total Emissions / Production
    spec_direct = fuel_engine.calculate_specific_emissions(
        fuel_result["total_co2e"], production_qty
    )

    # Calculate Indirect (Electricity)
    elec_engine = ElectricityCalculator()
    elec_result = elec_engine.calculate_indirect("Grid", 200.0)
    # Specific Indirect = Total Emissions / Production
    spec_indirect = round(elec_result["total_indirect_co2e"] / production_qty, 6)

    print(f"   Calculated Direct: {spec_direct} tCO2/t")
    print(f"   Calculated Indirect: {spec_indirect} tCO2/t")


    # --- PART 2: THE XML MAPPING ---
    
    # 1. Address & Declarant (Same as before)
    my_address = DeclarantAddressType(
        city="Ludhiana", street="Ind. Area B", postcode="141003", country="IN"
    )
    my_declarant = DeclarantType(
        identification_number="IN987654321012345", 
        name="Sharma Fasteners Pvt Ltd", 
        role="IMP", 
        actor_address=my_address
    )
    
    # 2. Signatures (Same as before)
    my_signatures = SignaturesType(
        report_confirmation=ReportConfirmationType(
            global_data_confirmation=True,
            use_of_data_confirmation=True,
            signature_place="Ludhiana",
            signature="Rajesh Sharma",
            position_of_person_sending="MD"
        )
    )

    # 3. The Product with EMISSIONS LINKED
    good = ImportedGoodType(
        item_number="1",
        origin_country=OriginCountryType(country="IN"),
        commodity_code=CommodityCodeType(
            hs_code="731815", 
            cn_code="73181510",
            commodity_details=CommodityDetailsType(
                description="Stainless steel screws and bolts"
            )
        ),
        measure_imported=MeasureType(
            net_mass=Decimal("1500.50"), measurement_unit="KGM"
        ),
        
        # *** THIS IS THE NEW PART ***
        goods_emissions=[
            GoodsEmissionsType(
                sequence_number="1",
                production_country="IN",
                produced_measure=MeasureType(
                    net_mass=Decimal("1500.50"), measurement_unit="KGM"
                ),
                # Mapping the Calculator Result to XML
                direct_emissions=DirectEmissionsType(
                    applicable_reporting_type_methodology="AC",  # AC = Actual Data (max 5 chars per XSD)
                    specific_embedded_emissions=Decimal(str(spec_direct)), # The calculated number
                    measurement_unit="TCO2"
                ),
                # Mapping the Electricity Result to XML
                indirect_emissions=IndirectEmissionsType(
                    determination_type="AC",  # AC = Actual Data (max 5 chars per XSD)
                    specific_embedded_emissions=Decimal(str(spec_indirect)), # The calculated number
                    measurement_unit="TCO2",
                    electricity_consumed=Decimal(str(elec_result["consumption_mwh"])),
                    electricity_source="GRID"
                )
            )
        ]
    )

    # 4. Final Assembly
    report = Qreport(
        reporting_period="Q4", year=2024,
        declarant=my_declarant, signatures=my_signatures,
        imported_good=[good] # Add the good to the list
    )

    # 5. Export
    config = SerializerConfig(pretty_print=True)
    serializer = XmlSerializer(config=config)
    xml_output = serializer.render(report)

    with open("Final_Sharma_Compliance_Report.xml", "w") as f:
        f.write(xml_output)
    
    print("✅ Full Report Generated with Emissions Data!")

if __name__ == "__main__":
    generate_final_report()
