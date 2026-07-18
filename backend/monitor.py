from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import time

from hashing import generate_hash
from compare_hash import compare_hash
from alert_logger import log_alert


class FileMonitor(FileSystemEventHandler):

    def on_modified(self, event):

        if event.is_directory:
            return

        print("\n📁 File Modified:", event.src_path)

        current_hash = generate_hash(event.src_path)

        if compare_hash("sample.txt", current_hash):
            print("✅ File Integrity Verified.")
        else:
            print("🚨 ALERT: File Modified!")
            log_alert("sample.txt")


observer = Observer()

event_handler = FileMonitor()

observer.schedule(
    event_handler,
    path="../test_files",
    recursive=False
)

observer.start()

print("👀 Nexora is monitoring files...")

try:
    while True:
        time.sleep(1)

except KeyboardInterrupt:
    observer.stop()

observer.join()