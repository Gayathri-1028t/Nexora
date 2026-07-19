from werkzeug.security import generate_password_hash, check_password_hash
from jose import jwt
from datetime import datetime, timedelta

SECRET_KEY = "nexora_secret_key"
ALGORITHM = "HS256"


def hash_password(password: str):
    return generate_password_hash(password)


def verify_password(password: str, hashed_password: str):
    return check_password_hash(hashed_password, password)


def create_access_token(data: dict):
    payload = data.copy()
    payload["exp"] = datetime.utcnow() + timedelta(hours=1)

    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)