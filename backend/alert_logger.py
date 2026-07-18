import json
from datetime import datetime


ALERT_FILE = "../database/alerts.json"


def log_alert(filename):

    alert = {
        "time": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "file": filename,
        "status": "Modified"
    }

    with open(ALERT_FILE, "r") as file:
        alerts = json.load(file)

    alerts.append(alert)

    with open(ALERT_FILE, "w") as file:
        json.dump(alerts, file, indent=4)

    print("✅ Alert Saved Successfully.")