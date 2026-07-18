from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Welcome to Nexora Backend"}

@app.get("/alerts")
def get_alerts():
    with open("../database/alerts.json", "r") as file:
        alerts = json.load(file)

    return alerts