# check_db.py - View the latest audit log entry
import sqlite3

conn = sqlite3.connect("cbam_audit_trail.db")
cursor = conn.cursor()

print("📋 CBAM Audit Trail - Recent Records")
print("=" * 60)

cursor.execute("SELECT * FROM audit_log ORDER BY id DESC LIMIT 5")
rows = cursor.fetchall()

if not rows:
    print("No records found. Generate a report first!")
else:
    for row in rows:
        print(f"""
ID: {row[0]}
Timestamp: {row[1]}
Company: {row[2]} ({row[3]})
City: {row[4]}
---
Inputs:
  Production: {row[5]} tonnes
  Coal Used: {row[6]} tonnes  
  Electricity: {row[7]} kWh
---
Outputs (What was reported to EU):
  Direct Emissions: {row[8]} tCO2/t
  Indirect Emissions: {row[9]} tCO2/t
{"=" * 60}""")

conn.close()
