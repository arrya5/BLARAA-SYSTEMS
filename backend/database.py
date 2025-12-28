import sqlite3
from datetime import datetime

DB_NAME = "cbam_audit_trail.db"

def init_db():
    """
    Creates the Glass Box vault if it doesn't exist.
    """
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    # Create a table that logs EVERY details
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS audit_log (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp DATETIME,
            company_name TEXT,
            company_id TEXT,
            city TEXT,
            
            -- The Raw Inputs (Evidence)
            input_production_tonnes REAL,
            input_coal_tonnes REAL,
            input_electricity_kwh REAL,
            
            -- The Calculated Outputs (What was reported)
            output_direct_specific REAL,
            output_indirect_specific REAL,
            
            -- The Hash (Proof it wasn't tampered with)
            report_hash TEXT
        )
    ''')
    conn.commit()
    conn.close()
    print("✅ Audit Database Initialized.")

def log_report(data, spec_direct, spec_indirect):
    """
    Saves the record forever.
    """
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT INTO audit_log (
            timestamp, company_name, company_id, city,
            input_production_tonnes, input_coal_tonnes, input_electricity_kwh,
            output_direct_specific, output_indirect_specific
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        datetime.now(), 
        data.company_name, 
        data.company_id, 
        data.city,
        data.production_tonnes, 
        data.coal_tonnes, 
        data.electricity_kwh,
        float(spec_direct),     # Convert Decimal to float for DB
        float(spec_indirect)
    ))
    
    conn.commit()
    conn.close()
    print(f"🔒 [AUDIT LOG] Record saved for {data.company_name}")
