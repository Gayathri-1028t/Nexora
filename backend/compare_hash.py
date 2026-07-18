import json

HASH_FILE = "../database/hash_store.json"


def compare_hash(filename, current_hash):

    with open(HASH_FILE, "r") as file:
        data = json.load(file)

    stored_hash = data.get(filename)

    if stored_hash == current_hash:
        return True
    else:
        return False