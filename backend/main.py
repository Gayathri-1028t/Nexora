from fastapi import FastAPI
import json

app = FastAPI()


@app.get("/")
def home():
    return {
        "message": "Welcome to Nexora Backend"
    }


@app.get("/alerts")
def get_alerts():

    with open("../database/alerts.json", "r") as file:
        alerts = json.load(file)

    return alerts