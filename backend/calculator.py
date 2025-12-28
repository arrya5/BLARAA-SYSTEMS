from decimal import Decimal
from typing import Optional

class CarbonCalculator:
    """
    The Brain of the CBAM SaaS.
    Converts raw factory inputs into EU-compliant emission numbers.
    """

    def __init__(self):
        # These are standard EU Default Values (You will eventually put these in a Database)
        # Source: EU CBAM Default Values 2024
        # TODO: Load these from a database in production - emission factors are updated annually by the EU
        self.factors = {
            "Lignite Coal": {"ncv": 0.0119, "ef": 101.2},  # NCV in TJ/Tonne, EF in tCO2/TJ
            "Natural Gas":  {"ncv": 0.0480, "ef": 56.1},   # NCV in TJ/Tonne, EF in tCO2/TJ
            "Diesel":       {"ncv": 0.0427, "ef": 74.1}
        }

    def calculate_direct_emissions(self, fuel_type: str, quantity: float) -> dict:
        """
        Input: Fuel Type (e.g., 'Diesel') and Quantity (Tonnes)
        Output: Total tCO2e
        """
        if fuel_type not in self.factors:
            raise ValueError(f"Unknown fuel type: {fuel_type}")
        
        factor = self.factors[fuel_type]
        
        # The Core Formula: Quantity * NCV * EmissionFactor
        energy_content = quantity * factor['ncv']  # Total Terajoules (TJ)
        total_emissions = energy_content * factor['ef']
        
        return {
            "fuel": fuel_type,
            "quantity_tonnes": quantity,
            "energy_tj": round(energy_content, 4),
            "total_co2e": round(total_emissions, 4)
        }

    def calculate_specific_emissions(self, total_emissions: float, production_quantity: float):
        """
        Calculates the 'Per Tonne' value required by CBAM.
        """
        if production_quantity == 0:
            return 0
        return round(total_emissions / production_quantity, 6)

# --- Test the Logic ---
if __name__ == "__main__":
    calc = CarbonCalculator()
    
    # Scenario: Sharma Fasteners used 50 Tonnes of Coal to produce 1500 Tonnes of Screws
    fuel_data = calc.calculate_direct_emissions("Lignite Coal", 50.0)
    
    specific_emissions = calc.calculate_specific_emissions(
        fuel_data["total_co2e"], 
        1500.0  # Production Quantity
    )
    
    print(f"🔥 Fuel Used: {fuel_data['fuel']}")
    print(f"🏭 Total Emissions: {fuel_data['total_co2e']} tCO2e")
    print(f"📉 Specific Embedded Emissions: {specific_emissions} tCO2e per tonne of product")
    print("This last number is exactly what goes into your XML!")


class ElectricityCalculator:
    def __init__(self):
        # Source: Central Electricity Authority (CEA) - India Grid Average
        self.india_grid_factor = 0.757  # tCO2e per MWh

    def calculate_indirect(self, source: str, consumption_kwh: float):
        """
        Input: source ('Grid' or 'Solar'), consumption in kWh
        Output: Emissions in tCO2e
        """
        # Convert kWh to MWh (CBAM standard)
        consumption_mwh = consumption_kwh / 1000.0

        if source.lower() == "solar":
            emission_factor = 0.0
        else:
            emission_factor = self.india_grid_factor

        total_emissions = consumption_mwh * emission_factor

        return {
            "source": source,
            "consumption_mwh": round(consumption_mwh, 3),
            "total_indirect_co2e": round(total_emissions, 4)
        }
