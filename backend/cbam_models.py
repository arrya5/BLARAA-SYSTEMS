from decimal import Decimal
from typing import Optional

from pydantic import BaseModel, ConfigDict
from xsdata_pydantic.fields import field

__NAMESPACE__ = "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1"


class AddressType(BaseModel):
    model_config = ConfigDict(defer_build=True)
    country: str = field(
        metadata={
            "name": "Country",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 2,
            "max_length": 2,
        }
    )
    sub_division: Optional[str] = field(
        default=None,
        metadata={
            "name": "SubDivision",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 35,
        },
    )
    city: str = field(
        metadata={
            "name": "City",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 1,
            "max_length": 35,
        }
    )
    street: Optional[str] = field(
        default=None,
        metadata={
            "name": "Street",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 70,
        },
    )
    street_additional_line: Optional[str] = field(
        default=None,
        metadata={
            "name": "StreetAdditionalLine",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 70,
        },
    )
    number: Optional[str] = field(
        default=None,
        metadata={
            "name": "Number",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 35,
        },
    )
    postcode: Optional[str] = field(
        default=None,
        metadata={
            "name": "Postcode",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 17,
        },
    )
    pobox: Optional[str] = field(
        default=None,
        metadata={
            "name": "POBox",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 70,
        },
    )


class ApplicableMethodologyConfirmationType(BaseModel):
    model_config = ConfigDict(defer_build=True)
    other_applicable_reporting_methodology: bool = field(
        metadata={
            "name": "OtherApplicableReportingMethodology",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
        }
    )


class AttachmentType(BaseModel):
    model_config = ConfigDict(defer_build=True)
    filename: str = field(
        metadata={
            "name": "Filename",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 1,
            "max_length": 256,
        }
    )
    uri: Optional[str] = field(
        default=None,
        metadata={
            "name": "URI",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 2048,
        },
    )
    mime: str = field(
        metadata={
            "name": "MIME",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 1,
            "max_length": 71,
        }
    )
    binary: Optional[bytes] = field(
        default=None,
        metadata={
            "name": "Binary",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "format": "base64",
        },
    )


class CommodityDetailsType(BaseModel):
    model_config = ConfigDict(defer_build=True)
    description: Optional[str] = field(
        default=None,
        metadata={
            "name": "Description",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 512,
        },
    )


class ContactDetailsType(BaseModel):
    model_config = ConfigDict(defer_build=True)
    name: str = field(
        metadata={
            "name": "Name",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 1,
            "max_length": 70,
        }
    )
    phone: str = field(
        metadata={
            "name": "Phone",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 1,
            "max_length": 35,
        }
    )
    email: str = field(
        metadata={
            "name": "Email",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 1,
            "max_length": 256,
        }
    )


class DeclarantAddressType(BaseModel):
    model_config = ConfigDict(defer_build=True)
    sub_division: Optional[str] = field(
        default=None,
        metadata={
            "name": "SubDivision",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 35,
        },
    )
    city: str = field(
        metadata={
            "name": "City",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 1,
            "max_length": 35,
        }
    )
    street: Optional[str] = field(
        default=None,
        metadata={
            "name": "Street",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 70,
        },
    )
    street_additional_line: Optional[str] = field(
        default=None,
        metadata={
            "name": "StreetAdditionalLine",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 70,
        },
    )
    number: Optional[str] = field(
        default=None,
        metadata={
            "name": "Number",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 35,
        },
    )
    postcode: Optional[str] = field(
        default=None,
        metadata={
            "name": "Postcode",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 17,
        },
    )
    pobox: Optional[str] = field(
        default=None,
        metadata={
            "name": "POBox",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 70,
        },
    )


class DirectEmissionsType(BaseModel):
    model_config = ConfigDict(defer_build=True)
    determination_type: Optional[str] = field(
        default=None,
        metadata={
            "name": "DeterminationType",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 5,
        },
    )
    determination_type_electricity: Optional[str] = field(
        default=None,
        metadata={
            "name": "DeterminationTypeElectricity",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 5,
        },
    )
    applicable_reporting_type_methodology: str = field(
        metadata={
            "name": "ApplicableReportingTypeMethodology",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 1,
            "max_length": 5,
        }
    )
    applicable_reporting_methodology: Optional[str] = field(
        default=None,
        metadata={
            "name": "ApplicableReportingMethodology",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 4000,
        },
    )
    specific_embedded_emissions: Optional[Decimal] = field(
        default=None,
        metadata={
            "name": "SpecificEmbeddedEmissions",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "total_digits": 16,
            "fraction_digits": 7,
        },
    )
    other_source_indication: Optional[str] = field(
        default=None,
        metadata={
            "name": "OtherSourceIndication",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 4000,
        },
    )
    emission_factor_source_electricity: Optional[str] = field(
        default=None,
        metadata={
            "name": "EmissionFactorSourceElectricity",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 5,
        },
    )
    emission_factor: Optional[Decimal] = field(
        default=None,
        metadata={
            "name": "EmissionFactor",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "total_digits": 16,
            "fraction_digits": 7,
        },
    )
    electricity_imported: Optional[Decimal] = field(
        default=None,
        metadata={
            "name": "ElectricityImported",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
        },
    )
    total_embedded_electricity_imported: Optional[Decimal] = field(
        default=None,
        metadata={
            "name": "TotalEmbeddedElectricityImported",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "total_digits": 16,
            "fraction_digits": 7,
        },
    )
    measurement_unit: str = field(
        metadata={
            "name": "MeasurementUnit",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 1,
            "max_length": 5,
        }
    )
    emission_factor_source_value: Optional[str] = field(
        default=None,
        metadata={
            "name": "EmissionFactorSourceValue",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 5000,
        },
    )
    conditionality_fulfillment: Optional[str] = field(
        default=None,
        metadata={
            "name": "ConditionalityFulfillment",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 5000,
        },
    )


class ImportAreaType(BaseModel):
    model_config = ConfigDict(defer_build=True)
    import_area: str = field(
        metadata={
            "name": "ImportArea",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 1,
            "max_length": 5,
        }
    )


class IndirectEmissionsType(BaseModel):
    model_config = ConfigDict(defer_build=True)
    determination_type: str = field(
        metadata={
            "name": "DeterminationType",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 1,
            "max_length": 5,
        }
    )
    emission_factor_source: Optional[str] = field(
        default=None,
        metadata={
            "name": "EmissionFactorSource",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 5,
        },
    )
    emission_factor: Optional[Decimal] = field(
        default=None,
        metadata={
            "name": "EmissionFactor",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "total_digits": 16,
            "fraction_digits": 5,
        },
    )
    specific_embedded_emissions: Decimal = field(
        metadata={
            "name": "SpecificEmbeddedEmissions",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "total_digits": 16,
            "fraction_digits": 7,
        }
    )
    measurement_unit: str = field(
        metadata={
            "name": "MeasurementUnit",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 1,
            "max_length": 5,
        }
    )
    electricity_consumed: Optional[Decimal] = field(
        default=None,
        metadata={
            "name": "ElectricityConsumed",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "total_digits": 10,
            "fraction_digits": 5,
        },
    )
    electricity_source: str = field(
        metadata={
            "name": "ElectricitySource",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 1,
            "max_length": 5,
        }
    )
    other_source_indication: Optional[str] = field(
        default=None,
        metadata={
            "name": "OtherSourceIndication",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 4000,
        },
    )
    emission_factor_source_value: Optional[str] = field(
        default=None,
        metadata={
            "name": "EmissionFactorSourceValue",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 512,
        },
    )


class InstallationAddressType(BaseModel):
    model_config = ConfigDict(defer_build=True)
    establishment_country: str = field(
        metadata={
            "name": "EstablishmentCountry",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 2,
            "max_length": 2,
        }
    )
    sub_division: Optional[str] = field(
        default=None,
        metadata={
            "name": "SubDivision",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 35,
        },
    )
    city: str = field(
        metadata={
            "name": "City",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 1,
            "max_length": 35,
        }
    )
    street: Optional[str] = field(
        default=None,
        metadata={
            "name": "Street",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 70,
        },
    )
    street_additional_line: Optional[str] = field(
        default=None,
        metadata={
            "name": "StreetAdditionalLine",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 70,
        },
    )
    number: Optional[str] = field(
        default=None,
        metadata={
            "name": "Number",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 35,
        },
    )
    postcode: Optional[str] = field(
        default=None,
        metadata={
            "name": "Postcode",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 17,
        },
    )
    pobox: Optional[str] = field(
        default=None,
        metadata={
            "name": "POBox",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 70,
        },
    )
    plot_parcel_number: Optional[str] = field(
        default=None,
        metadata={
            "name": "PlotParcelNumber",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 15,
        },
    )
    unlocode: Optional[str] = field(
        default=None,
        metadata={
            "name": "UNLOCODE",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 17,
        },
    )
    latitude: Optional[str] = field(
        default=None,
        metadata={
            "name": "Latitude",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 17,
        },
    )
    longitude: Optional[str] = field(
        default=None,
        metadata={
            "name": "Longitude",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 17,
        },
    )
    coordinates_type: Optional[str] = field(
        default=None,
        metadata={
            "name": "CoordinatesType",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 5,
        },
    )


class InwardProcessingInfoType(BaseModel):
    model_config = ConfigDict(defer_build=True)
    member_state_auth: str = field(
        metadata={
            "name": "MemberStateAuth",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 2,
            "max_length": 2,
        }
    )
    discharge_bill_waiver: int = field(
        metadata={
            "name": "DischargeBillWaiver",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "total_digits": 1,
        }
    )
    authorisation: str = field(
        metadata={
            "name": "Authorisation",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 1,
            "max_length": 512,
        }
    )
    start_time: int = field(
        metadata={
            "name": "StartTime",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "total_digits": 8,
        }
    )
    end_time: int = field(
        metadata={
            "name": "EndTime",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "total_digits": 8,
        }
    )
    deadline: int = field(
        metadata={
            "name": "Deadline",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "total_digits": 8,
        }
    )


class MeasureProcedureType(BaseModel):
    model_config = ConfigDict(defer_build=True)
    indicator: int = field(
        metadata={
            "name": "Indicator",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "total_digits": 1,
        }
    )
    net_mass: Optional[Decimal] = field(
        default=None,
        metadata={
            "name": "NetMass",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "total_digits": 16,
            "fraction_digits": 6,
        },
    )
    supplementary_units: Optional[Decimal] = field(
        default=None,
        metadata={
            "name": "SupplementaryUnits",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "total_digits": 16,
            "fraction_digits": 6,
        },
    )
    measurement_unit: str = field(
        metadata={
            "name": "MeasurementUnit",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 1,
            "max_length": 5,
        }
    )


class MeasureType(BaseModel):
    model_config = ConfigDict(defer_build=True)
    net_mass: Optional[Decimal] = field(
        default=None,
        metadata={
            "name": "NetMass",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "total_digits": 16,
            "fraction_digits": 6,
        },
    )
    supplementary_units: Optional[Decimal] = field(
        default=None,
        metadata={
            "name": "SupplementaryUnits",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "total_digits": 16,
            "fraction_digits": 6,
        },
    )
    measurement_unit: str = field(
        metadata={
            "name": "MeasurementUnit",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 1,
            "max_length": 5,
        }
    )


class OriginCountryType(BaseModel):
    model_config = ConfigDict(defer_build=True)
    country: str = field(
        metadata={
            "name": "Country",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 2,
            "max_length": 2,
        }
    )


class QualifyingParametersType(BaseModel):
    model_config = ConfigDict(defer_build=True)
    sequence_number: str = field(
        metadata={
            "name": "SequenceNumber",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "pattern": r"\d{1,5}",
        }
    )
    parameter_id: str = field(
        metadata={
            "name": "ParameterId",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 1,
            "max_length": 5,
        }
    )
    parameter_value: str = field(
        metadata={
            "name": "ParameterValue",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 1,
            "max_length": 256,
        }
    )
    additional_information: Optional[str] = field(
        default=None,
        metadata={
            "name": "AdditionalInformation",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 512,
        },
    )


class RemarksEmissionsType(BaseModel):
    model_config = ConfigDict(defer_build=True)
    sequence_number: str = field(
        metadata={
            "name": "SequenceNumber",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "pattern": r"\d{1,5}",
        }
    )
    additional_information: str = field(
        metadata={
            "name": "AdditionalInformation",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 1,
            "max_length": 512,
        }
    )


class RemarksType(BaseModel):
    model_config = ConfigDict(defer_build=True)
    additional_information: str = field(
        metadata={
            "name": "AdditionalInformation",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 1,
            "max_length": 512,
        }
    )


class ReportConfirmationType(BaseModel):
    model_config = ConfigDict(defer_build=True)
    global_data_confirmation: bool = field(
        metadata={
            "name": "GlobalDataConfirmation",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
        }
    )
    use_of_data_confirmation: bool = field(
        metadata={
            "name": "UseOfDataConfirmation",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
        }
    )
    signature_place: str = field(
        metadata={
            "name": "SignaturePlace",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 1,
            "max_length": 128,
        }
    )
    signature: str = field(
        metadata={
            "name": "Signature",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 1,
            "max_length": 128,
        }
    )
    position_of_person_sending: str = field(
        metadata={
            "name": "PositionOfPersonSending",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 1,
            "max_length": 128,
        }
    )


class SpecialReferencesType(BaseModel):
    model_config = ConfigDict(defer_build=True)
    additional_information: str = field(
        metadata={
            "name": "AdditionalInformation",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 1,
            "max_length": 512,
        }
    )


class CommodityCodeType(BaseModel):
    model_config = ConfigDict(defer_build=True)
    hs_code: str = field(
        metadata={
            "name": "HsCode",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 6,
            "max_length": 6,
        }
    )
    cn_code: str = field(
        metadata={
            "name": "CnCode",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 8,
            "max_length": 8,
        }
    )
    commodity_details: CommodityDetailsType = field(
        metadata={
            "name": "CommodityDetails",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
        }
    )


class DeclarantType(BaseModel):
    model_config = ConfigDict(defer_build=True)
    identification_number: str = field(
        metadata={
            "name": "IdentificationNumber",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 1,
            "max_length": 17,
        }
    )
    name: str = field(
        metadata={
            "name": "Name",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 1,
            "max_length": 70,
        }
    )
    role: str = field(
        metadata={
            "name": "Role",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 1,
            "max_length": 5,
        }
    )
    actor_address: DeclarantAddressType = field(
        metadata={
            "name": "ActorAddress",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
        }
    )


class ImporterType(BaseModel):
    model_config = ConfigDict(defer_build=True)
    identification_number: str = field(
        metadata={
            "name": "IdentificationNumber",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 1,
            "max_length": 17,
        }
    )
    name: str = field(
        metadata={
            "name": "Name",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 1,
            "max_length": 70,
        }
    )
    importer_address: AddressType = field(
        metadata={
            "name": "ImporterAddress",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
        }
    )


class InstallationOperatorType(BaseModel):
    model_config = ConfigDict(defer_build=True)
    operator_id: str = field(
        metadata={
            "name": "OperatorId",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 1,
            "max_length": 25,
        }
    )
    operator_name: str = field(
        metadata={
            "name": "OperatorName",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 1,
            "max_length": 70,
        }
    )
    operator_address: AddressType = field(
        metadata={
            "name": "OperatorAddress",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
        }
    )
    contact_details: list[ContactDetailsType] = field(
        default_factory=list,
        metadata={
            "name": "ContactDetails",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_occurs": 1,
            "max_occurs": 9,
        },
    )


class InstallationType(BaseModel):
    model_config = ConfigDict(defer_build=True)
    installation_id: str = field(
        metadata={
            "name": "InstallationId",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 1,
            "max_length": 20,
        }
    )
    installation_name: str = field(
        metadata={
            "name": "InstallationName",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 1,
            "max_length": 256,
        }
    )
    economic_activity: Optional[str] = field(
        default=None,
        metadata={
            "name": "EconomicActivity",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 256,
        },
    )
    address: InstallationAddressType = field(
        metadata={
            "name": "Address",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
        }
    )


class ProcedureType(BaseModel):
    model_config = ConfigDict(defer_build=True)
    requested_proc: str = field(
        metadata={
            "name": "RequestedProc",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 2,
            "max_length": 2,
        }
    )
    previous_proc: Optional[str] = field(
        default=None,
        metadata={
            "name": "PreviousProc",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 2,
            "max_length": 2,
        },
    )
    inward_processing_info: list[InwardProcessingInfoType] = field(
        default_factory=list,
        metadata={
            "name": "InwardProcessingInfo",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "max_occurs": 999,
        },
    )


class ProdMethodQualifyingParamsType(BaseModel):
    model_config = ConfigDict(defer_build=True)
    sequence_number: str = field(
        metadata={
            "name": "SequenceNumber",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "pattern": r"\d{1,5}",
        }
    )
    method_id: str = field(
        metadata={
            "name": "MethodId",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 1,
            "max_length": 5,
        }
    )
    steel_mill_number: Optional[str] = field(
        default=None,
        metadata={
            "name": "SteelMillNumber",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 256,
        },
    )
    additional_information: Optional[str] = field(
        default=None,
        metadata={
            "name": "AdditionalInformation",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 512,
        },
    )
    direct_qualifying_parameters: list[QualifyingParametersType] = field(
        default_factory=list,
        metadata={
            "name": "DirectQualifyingParameters",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "max_occurs": 99,
        },
    )
    indirect_qualifying_parameters: list[QualifyingParametersType] = field(
        default_factory=list,
        metadata={
            "name": "IndirectQualifyingParameters",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "max_occurs": 99,
        },
    )


class ProductsCoveredType(BaseModel):
    model_config = ConfigDict(defer_build=True)
    sequence_number: str = field(
        metadata={
            "name": "SequenceNumber",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "pattern": r"\d{1,5}",
        }
    )
    type_value: str = field(
        metadata={
            "name": "Type",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 1,
            "max_length": 5,
        }
    )
    cn: Optional[str] = field(
        default=None,
        metadata={
            "name": "CN",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 8,
        },
    )
    quantity_covered: Decimal = field(
        metadata={
            "name": "QuantityCovered",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "total_digits": 16,
            "fraction_digits": 5,
        }
    )
    quantity_covered_free_aloc: Decimal = field(
        metadata={
            "name": "QuantityCoveredFreeAloc",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "total_digits": 16,
            "fraction_digits": 5,
        }
    )
    supplementary_information: Optional[str] = field(
        default=None,
        metadata={
            "name": "SupplementaryInformation",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 256,
        },
    )
    additional_information: Optional[str] = field(
        default=None,
        metadata={
            "name": "AdditionalInformation",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 512,
        },
    )
    measure: MeasureType = field(
        metadata={
            "name": "Measure",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
        }
    )


class RepresentativeType(BaseModel):
    model_config = ConfigDict(defer_build=True)
    identification_number: str = field(
        metadata={
            "name": "IdentificationNumber",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 1,
            "max_length": 17,
        }
    )
    name: str = field(
        metadata={
            "name": "Name",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 1,
            "max_length": 70,
        }
    )
    representative_address: AddressType = field(
        metadata={
            "name": "RepresentativeAddress",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
        }
    )


class SignaturesType(BaseModel):
    model_config = ConfigDict(defer_build=True)
    report_confirmation: ReportConfirmationType = field(
        metadata={
            "name": "ReportConfirmation",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
        }
    )
    applicable_methodology_confirmation: Optional[
        ApplicableMethodologyConfirmationType
    ] = field(
        default=None,
        metadata={
            "name": "ApplicableMethodologyConfirmation",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
        },
    )


class SupportingDocumentsType(BaseModel):
    model_config = ConfigDict(defer_build=True)
    sequence_number: str = field(
        metadata={
            "name": "SequenceNumber",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "pattern": r"\d{1,5}",
        }
    )
    type_value: str = field(
        metadata={
            "name": "Type",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 4,
            "max_length": 4,
        }
    )
    country: Optional[str] = field(
        default=None,
        metadata={
            "name": "Country",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 2,
            "max_length": 2,
        },
    )
    reference_number: Optional[str] = field(
        default=None,
        metadata={
            "name": "ReferenceNumber",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 70,
        },
    )
    line_item_number: Optional[str] = field(
        default=None,
        metadata={
            "name": "LineItemNumber",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "pattern": r"\d{1,5}",
        },
    )
    issuing_auth_name: Optional[str] = field(
        default=None,
        metadata={
            "name": "IssuingAuthName",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 70,
        },
    )
    validity_start_date: Optional[str] = field(
        default=None,
        metadata={
            "name": "ValidityStartDate",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "pattern": r"\d{4}-\d\d-\d\d",
        },
    )
    validity_end_date: Optional[str] = field(
        default=None,
        metadata={
            "name": "ValidityEndDate",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "pattern": r"\d{4}-\d\d-\d\d",
        },
    )
    description: Optional[str] = field(
        default=None,
        metadata={
            "name": "Description",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 256,
        },
    )
    attachment: Optional[AttachmentType] = field(
        default=None,
        metadata={
            "name": "Attachment",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
        },
    )


class CarbonPriceDueType(BaseModel):
    model_config = ConfigDict(defer_build=True)
    sequence_number: str = field(
        metadata={
            "name": "SequenceNumber",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "pattern": r"\d{1,5}",
        }
    )
    instrument_type: str = field(
        metadata={
            "name": "InstrumentType",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 1,
            "max_length": 5,
        }
    )
    legal_act_description: str = field(
        metadata={
            "name": "LegalActDescription",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 1,
            "max_length": 512,
        }
    )
    amount: Decimal = field(
        metadata={
            "name": "Amount",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
        }
    )
    currency: str = field(
        metadata={
            "name": "Currency",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 3,
            "max_length": 3,
        }
    )
    country: str = field(
        metadata={
            "name": "Country",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 2,
            "max_length": 2,
        }
    )
    products_covered: list[ProductsCoveredType] = field(
        default_factory=list,
        metadata={
            "name": "ProductsCovered",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "max_occurs": 9,
        },
    )


class ImportedQuantityType(BaseModel):
    model_config = ConfigDict(defer_build=True)
    sequence_number: str = field(
        metadata={
            "name": "SequenceNumber",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "pattern": r"\d{1,5}",
        }
    )
    procedure: ProcedureType = field(
        metadata={
            "name": "Procedure",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
        }
    )
    import_area: ImportAreaType = field(
        metadata={
            "name": "ImportArea",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
        }
    )
    measure_procedure_imported: list[MeasureProcedureType] = field(
        default_factory=list,
        metadata={
            "name": "MeasureProcedureImported",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_occurs": 1,
            "max_occurs": 2,
        },
    )
    special_references: Optional[SpecialReferencesType] = field(
        default=None,
        metadata={
            "name": "SpecialReferences",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
        },
    )


class GoodsEmissionsType(BaseModel):
    model_config = ConfigDict(defer_build=True)
    sequence_number: str = field(
        metadata={
            "name": "SequenceNumber",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "pattern": r"\d{1,5}",
        }
    )
    production_country: Optional[str] = field(
        default=None,
        metadata={
            "name": "ProductionCountry",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 2,
            "max_length": 2,
        },
    )
    installation_operator: Optional[InstallationOperatorType] = field(
        default=None,
        metadata={
            "name": "InstallationOperator",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
        },
    )
    installation: Optional[InstallationType] = field(
        default=None,
        metadata={
            "name": "Installation",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
        },
    )
    produced_measure: MeasureType = field(
        metadata={
            "name": "ProducedMeasure",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
        }
    )
    direct_emissions: DirectEmissionsType = field(
        metadata={
            "name": "DirectEmissions",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
        }
    )
    indirect_emissions: Optional[IndirectEmissionsType] = field(
        default=None,
        metadata={
            "name": "IndirectEmissions",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
        },
    )
    prod_method_qualifying_params: Optional[ProdMethodQualifyingParamsType] = (
        field(
            default=None,
            metadata={
                "name": "ProdMethodQualifyingParams",
                "type": "Element",
                "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            },
        )
    )
    supporting_documents: list[SupportingDocumentsType] = field(
        default_factory=list,
        metadata={
            "name": "SupportingDocuments",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "max_occurs": 99,
        },
    )
    carbon_price_due: list[CarbonPriceDueType] = field(
        default_factory=list,
        metadata={
            "name": "CarbonPriceDue",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "max_occurs": 99,
        },
    )
    remarks_emissions: list[RemarksEmissionsType] = field(
        default_factory=list,
        metadata={
            "name": "RemarksEmissions",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "max_occurs": 9,
        },
    )


class ImportedGoodType(BaseModel):
    model_config = ConfigDict(defer_build=True)
    item_number: str = field(
        metadata={
            "name": "ItemNumber",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "pattern": r"\d{1,5}",
        }
    )
    representative: Optional[RepresentativeType] = field(
        default=None,
        metadata={
            "name": "Representative",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
        },
    )
    importer: Optional[ImporterType] = field(
        default=None,
        metadata={
            "name": "Importer",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
        },
    )
    commodity_code: Optional[CommodityCodeType] = field(
        default=None,
        metadata={
            "name": "CommodityCode",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
        },
    )
    origin_country: OriginCountryType = field(
        metadata={
            "name": "OriginCountry",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
        }
    )
    imported_quantity: list[ImportedQuantityType] = field(
        default_factory=list,
        metadata={
            "name": "ImportedQuantity",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_occurs": 1,
            "max_occurs": 9,
        },
    )
    measure_imported: MeasureType = field(
        metadata={
            "name": "MeasureImported",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
        }
    )
    supporting_documents: list[SupportingDocumentsType] = field(
        default_factory=list,
        metadata={
            "name": "SupportingDocuments",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "max_occurs": 99,
        },
    )
    remarks: Optional[RemarksType] = field(
        default=None,
        metadata={
            "name": "Remarks",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
        },
    )
    goods_emissions: list[GoodsEmissionsType] = field(
        default_factory=list,
        metadata={
            "name": "GoodsEmissions",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_occurs": 1,
            "max_occurs": 999,
        },
    )


class QreportType(BaseModel):
    class Meta:
        name = "QReportType"

    model_config = ConfigDict(defer_build=True)
    submission_date: Optional[str] = field(
        default=None,
        metadata={
            "name": "SubmissionDate",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "pattern": r"\d{4}-\d\d-\d\dT\d\d:\d\d:\d\dZ",
        },
    )
    report_id: Optional[str] = field(
        default=None,
        metadata={
            "name": "ReportId",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_length": 1,
            "max_length": 22,
        },
    )
    reporting_period: str = field(
        metadata={
            "name": "ReportingPeriod",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "min_length": 2,
            "max_length": 2,
        }
    )
    year: int = field(
        metadata={
            "name": "Year",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
            "total_digits": 4,
        }
    )
    declarant: DeclarantType = field(
        metadata={
            "name": "Declarant",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
        }
    )
    representative: Optional[RepresentativeType] = field(
        default=None,
        metadata={
            "name": "Representative",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
        },
    )
    importer: Optional[ImporterType] = field(
        default=None,
        metadata={
            "name": "Importer",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
        },
    )
    signatures: SignaturesType = field(
        metadata={
            "name": "Signatures",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "required": True,
        }
    )
    remarks: Optional[RemarksType] = field(
        default=None,
        metadata={
            "name": "Remarks",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
        },
    )
    imported_good: list[ImportedGoodType] = field(
        default_factory=list,
        metadata={
            "name": "ImportedGood",
            "type": "Element",
            "namespace": "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1",
            "min_occurs": 1,
            "max_occurs": 99999,
        },
    )


class Qreport(QreportType):
    class Meta:
        name = "QReport"
        namespace = "http://xmlns.ec.eu/BusinessObjects/CBAM/Types/V1"

    model_config = ConfigDict(defer_build=True)
