from security import hash_password

# Default Users
users_db = [
    {
        "id": 1,
        "username": "admin",
        "password": hash_password("admin123"),
        "role": "Admin",
        "full_name": "System Administrator"
    },
    {
        "id": 2,
        "username": "analyst",
        "password": hash_password("analyst123"),
        "role": "Analyst",
        "full_name": "Security Analyst"
    }
]


# -------------------------
# Find User
# -------------------------
def get_user(username: str):
    for user in users_db:
        if user["username"] == username:
            return user
    return None