"""
CBAM PDF Report Generator
Generates a professional PDF version of the CBAM compliance report
"""
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch, cm
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from io import BytesIO
from datetime import datetime


def generate_cbam_pdf(data, spec_direct, spec_indirect, elec_result):
    """
    Generates a professional PDF report for CBAM compliance.
    
    Args:
        data: FactoryInput object with company details
        spec_direct: Specific direct emissions (tCO2/tonne)
        spec_indirect: Specific indirect emissions (tCO2/tonne)
        elec_result: Electricity calculation results
    
    Returns:
        BytesIO buffer containing the PDF
    """
    buffer = BytesIO()
    doc = SimpleDocTemplate(
        buffer, 
        pagesize=A4,
        rightMargin=1*cm,
        leftMargin=1*cm,
        topMargin=1*cm,
        bottomMargin=1*cm
    )
    
    # Styles
    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        spaceAfter=30,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#1e293b')
    )
    
    subtitle_style = ParagraphStyle(
        'CustomSubtitle',
        parent=styles['Normal'],
        fontSize=12,
        spaceAfter=20,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#64748b')
    )
    
    section_header = ParagraphStyle(
        'SectionHeader',
        parent=styles['Heading2'],
        fontSize=14,
        spaceBefore=20,
        spaceAfter=10,
        textColor=colors.HexColor('#1e40af'),
        borderPadding=5
    )
    
    normal_style = ParagraphStyle(
        'CustomNormal',
        parent=styles['Normal'],
        fontSize=10,
        textColor=colors.HexColor('#334155')
    )
    
    # Build document elements
    elements = []
    
    # Header
    elements.append(Paragraph("🌍 CBAM COMPLIANCE REPORT", title_style))
    elements.append(Paragraph(
        f"EU Carbon Border Adjustment Mechanism - Q4 2024",
        subtitle_style
    ))
    elements.append(Paragraph(
        f"Generated: {datetime.now().strftime('%B %d, %Y at %H:%M')}",
        subtitle_style
    ))
    elements.append(Spacer(1, 20))
    
    # Company Information Section
    elements.append(Paragraph("📋 DECLARANT INFORMATION", section_header))
    
    company_data = [
        ['Field', 'Value'],
        ['Company Name', data.company_name],
        ['Company ID', data.company_id],
        ['City', data.city],
        ['Country', 'India (IN)'],
        ['Role', 'Importer (IMP)'],
    ]
    
    company_table = Table(company_data, colWidths=[200, 300])
    company_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1e40af')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 11),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('TOPPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.HexColor('#f8fafc')),
        ('TEXTCOLOR', (0, 1), (-1, -1), colors.HexColor('#334155')),
        ('FONTNAME', (0, 1), (0, -1), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 1), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 1), (-1, -1), 8),
        ('TOPPADDING', (0, 1), (-1, -1), 8),
        ('GRID', (0, 0), (-1, -1), 1, colors.HexColor('#e2e8f0')),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ]))
    elements.append(company_table)
    elements.append(Spacer(1, 20))
    
    # Production Data Section
    elements.append(Paragraph("🏭 PRODUCTION DATA", section_header))
    
    production_data = [
        ['Metric', 'Value', 'Unit'],
        ['Total Production', f"{data.production_tonnes:,.2f}", 'Tonnes'],
        ['Coal Consumption', f"{data.coal_tonnes:,.2f}", 'Tonnes'],
        ['Electricity Consumption', f"{data.electricity_kwh:,.2f}", 'kWh'],
        ['Electricity (MWh)', f"{elec_result['consumption_mwh']:.3f}", 'MWh'],
    ]
    
    production_table = Table(production_data, colWidths=[200, 150, 150])
    production_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#059669')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('ALIGN', (1, 1), (2, -1), 'RIGHT'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 11),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('TOPPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.HexColor('#f0fdf4')),
        ('TEXTCOLOR', (0, 1), (-1, -1), colors.HexColor('#334155')),
        ('FONTNAME', (0, 1), (0, -1), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 1), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 1), (-1, -1), 8),
        ('TOPPADDING', (0, 1), (-1, -1), 8),
        ('GRID', (0, 0), (-1, -1), 1, colors.HexColor('#bbf7d0')),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ]))
    elements.append(production_table)
    elements.append(Spacer(1, 20))
    
    # Emissions Summary Section
    elements.append(Paragraph("📊 EMISSIONS SUMMARY", section_header))
    
    emissions_data = [
        ['Emission Type', 'Value', 'Unit', 'Method'],
        ['Direct Emissions (Specific)', f"{float(spec_direct):.6f}", 'tCO2/tonne', 'Actual (AC)'],
        ['Indirect Emissions (Specific)', f"{float(spec_indirect):.6f}", 'tCO2/tonne', 'Actual (AC)'],
        ['Total Specific Emissions', f"{float(spec_direct) + float(spec_indirect):.6f}", 'tCO2/tonne', '-'],
        ['Total Absolute Emissions', f"{(float(spec_direct) + float(spec_indirect)) * data.production_tonnes:.2f}", 'tCO2', '-'],
    ]
    
    emissions_table = Table(emissions_data, colWidths=[180, 120, 100, 100])
    emissions_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#dc2626')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('ALIGN', (1, 1), (2, -1), 'RIGHT'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 11),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('TOPPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.HexColor('#fef2f2')),
        ('BACKGROUND', (0, 3), (-1, 3), colors.HexColor('#fecaca')),  # Highlight total
        ('BACKGROUND', (0, 4), (-1, 4), colors.HexColor('#fecaca')),  # Highlight total
        ('TEXTCOLOR', (0, 1), (-1, -1), colors.HexColor('#334155')),
        ('FONTNAME', (0, 1), (0, -1), 'Helvetica-Bold'),
        ('FONTNAME', (0, 3), (-1, 4), 'Helvetica-Bold'),  # Bold totals
        ('FONTSIZE', (0, 1), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 1), (-1, -1), 8),
        ('TOPPADDING', (0, 1), (-1, -1), 8),
        ('GRID', (0, 0), (-1, -1), 1, colors.HexColor('#fecaca')),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ]))
    elements.append(emissions_table)
    elements.append(Spacer(1, 20))
    
    # Commodity Details Section
    elements.append(Paragraph("📦 COMMODITY DETAILS", section_header))
    
    commodity_data = [
        ['Field', 'Value'],
        ['HS Code', '731815'],
        ['CN Code', '73181510'],
        ['Description', 'Steel products'],
        ['Origin Country', 'India (IN)'],
        ['Net Mass', f"{data.production_tonnes * 1000:,.0f} kg ({data.production_tonnes:,.2f} tonnes)"],
        ['Measurement Unit', 'KGM (Kilograms)'],
    ]
    
    commodity_table = Table(commodity_data, colWidths=[200, 300])
    commodity_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#7c3aed')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 11),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('TOPPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.HexColor('#f5f3ff')),
        ('TEXTCOLOR', (0, 1), (-1, -1), colors.HexColor('#334155')),
        ('FONTNAME', (0, 1), (0, -1), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 1), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 1), (-1, -1), 8),
        ('TOPPADDING', (0, 1), (-1, -1), 8),
        ('GRID', (0, 0), (-1, -1), 1, colors.HexColor('#ddd6fe')),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ]))
    elements.append(commodity_table)
    elements.append(Spacer(1, 30))
    
    # Footer
    footer_style = ParagraphStyle(
        'Footer',
        parent=styles['Normal'],
        fontSize=9,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#94a3b8')
    )
    
    elements.append(Paragraph(
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
        footer_style
    ))
    elements.append(Spacer(1, 10))
    elements.append(Paragraph(
        "This report was generated using BLARAA SYSTEMS - CBAM Compliance Tool",
        footer_style
    ))
    elements.append(Paragraph(
        "The XML file has been generated separately for EU CBAM Portal submission.",
        footer_style
    ))
    elements.append(Paragraph(
        "Disclaimer: Please verify calculations with official EU CBAM guidelines before submission.",
        footer_style
    ))
    elements.append(Paragraph(
        f"BLARAA Systems • India • Professional Compliance Solutions",
        footer_style
    ))
    
    # Build PDF
    doc.build(elements)
    buffer.seek(0)
    return buffer
