import json

def compare_hash(file_name, new_hash):

    with open("../database/hash_store.json", "r") as file:
        data = json.load(file)

    old_hash = data.get(file_name)

    if old_hash is None:
        print("❌ File not found in hash storage.")
        return

    if old_hash == new_hash:
        print("✅ File Integrity Verified (No Changes).")

    else:
        print("🚨 ALERT: File Modified!")