import subprocess
import os
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

def run_backup():
    db_name = os.getenv("DB_NAME", "car_tech_db")
    # Zeitstempel für "Point-in-Time" Identifikation (Vorgabe Webseite 1)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_dir = os.path.join("database", "backups", timestamp)

    if not os.path.exists(backup_dir):
        os.makedirs(backup_dir)

    # Der offizielle mongodump Befehl
    cmd = f'mongodump --db {db_name} --out "{backup_dir}"'
    
    print(f"--- Starte Full Backup für {db_name} ---")
    try:
        subprocess.run(cmd, check=True, shell=True)
        print(f"✅ Backup erfolgreich erstellt in: {backup_dir}")
    except Exception as e:
        print(f"❌ Fehler beim Backup: {e}")

if __name__ == "__main__":
    run_backup()