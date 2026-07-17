import hashlib


def generate_hash(file_path):
    """
    Generates the SHA-256 hash of a file.

    Args:
        file_path (str): Path of the file.

    Returns:
        str: SHA-256 hash value.
    """

    sha256 = hashlib.sha256()

    with open(file_path, "rb") as file:

        while True:

            chunk = file.read(4096)

            if not chunk:
                break

            sha256.update(chunk)

    return sha256.hexdigest()