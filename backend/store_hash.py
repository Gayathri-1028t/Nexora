import json

def save_hash(file_name, hash_value):
    with open("../database/hash_store.json", "r") as file:
        data = json.load(file)

    data[file_name] = hash_value

    with open("../database/hash_store.json", "w") as file:
        json.dump(data, file, indent=4)

    print("✅ Hash stored successfully.")