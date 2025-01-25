import time
import MySQLdb
from django.db import connections
from django.db.utils import OperationalError

def wait_for_db():
    """Wait until MySQL is available."""
    db_conn = None
    while db_conn is None:
        try:
            print("Waiting for database...")
            db_conn = MySQLdb.connect(
                host='db',  # The service name defined in your docker-compose.yml
                user='mhpcoder',
                password='justkidding12!@',
                database='learnathon',
                port=3306
            )
        except MySQLdb.OperationalError:
            print("Database unavailable, waiting 1 second...")
            time.sleep(1)