from fastapi import FastAPI, Depends, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import engine, get_db
from models import Base
import crud
import schemas
from websocket_manager import manager

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Nexora Backend")

# -----------------------------
# CORS
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Home API
# -----------------------------
@app.get("/")
def home():
    return {
        "message": "Welcome to Nexora Backend 🚀"
    }


# -----------------------------
# Get All Alerts
# -----------------------------
@app.get("/alerts")
def get_alerts(db: Session = Depends(get_db)):
    return crud.get_alerts(db)


# -----------------------------
# Add New Alert
# -----------------------------
@app.post("/alerts", response_model=schemas.Alert)
def add_alert(
    alert: schemas.AlertCreate,
    db: Session = Depends(get_db)
):
    new_alert = crud.create_alert(db, alert)
    return new_alert


# -----------------------------
# WebSocket Endpoint
# -----------------------------
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)

    try:
        while True:
            await websocket.receive_text()

    except WebSocketDisconnect:
        manager.disconnect(websocket)