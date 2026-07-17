from hashing import generate_hash

file_path = "../test_files/sample.txt"

hash_value = generate_hash(file_path)

print("SHA-256 Hash:")
print(hash_value)