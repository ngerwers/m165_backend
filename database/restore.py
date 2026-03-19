import subprocess
import os
from dotenv import load_dotenv

load_dotenv()

def run_restore():
    db_name = os.getenv("DB_NAME", "car_tech_db")
    
    # Wir suchen das neueste Backup im Ordner
    backup_root = os.path.join("database", "backups")
    if not os.path.exists(backup_root) or not os.listdir(backup_root):
        print("❌ Kein Backup-Ordner gefunden!")
        return

    all_backups = sorted(os.listdir(backup_root), reverse=True)
    latest_backup = os.path.join(backup_root, all_backups[0], db_name)

    # Der offizielle mongorestore Befehl mit --drop (Vorgabe Webseite 2)
    cmd = f'mongorestore --db {db_name} "{latest_backup}" --drop'
    
    print(f"--- Wiederherstellung von: {all_backups[0]} ---")
    try:
        subprocess.run(cmd, check=True, shell=True)
        print(f"✅ Datenbank {db_name} wurde erfolgreich wiederhergestellt.")
    except Exception as e:
        print(f"❌ Fehler beim Restore: {e}")

if __name__ == "__main__":
    run_restore()