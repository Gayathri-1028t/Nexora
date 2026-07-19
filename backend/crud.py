from sqlalchemy.orm import Session
import models
import schemas


def create_alert(db: Session, alert: schemas.AlertCreate):
    db_alert = models.Alert(
        time=alert.time,
        file=alert.file,
        status=alert.status,
        threat=alert.threat,
    )

    db.add(db_alert)
    db.commit()
    db.refresh(db_alert)

    return db_alert


def get_alerts(db: Session):
    return db.query(models.Alert).order_by(models.Alert.id.desc()).all()