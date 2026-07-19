from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from users import get_user
from security import verify_password, create_access_token

router = APIRouter()


# -------------------------
# Login Request Model
# -------------------------
class LoginRequest(BaseModel):
    username: str
    password: str


# -------------------------
# Login API
# -------------------------
@router.post("/login")
def login(data: LoginRequest):

    user = get_user(data.username)

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid Username"
        )

    if not verify_password(
        data.password,
        user["password"]
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid Password"
        )

    token = create_access_token(
        {
            "sub": user["username"],
            "role": user["role"]
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "username": user["username"],
        "role": user["role"],
        "full_name": user["full_name"]
    }