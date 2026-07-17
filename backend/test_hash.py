from hashing import generate_hash
from compare_hash import compare_hash

file_path = "../test_files/sample.txt"

# Generate current hash
current_hash = generate_hash(file_path)

print("Current SHA-256 Hash:")
print(current_hash)

# Compare with stored hash
compare_hash("sample.txt", current_hash)