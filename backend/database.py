import pymysql


def get_db_connection():
    return pymysql.connect(
        host="localhost",
        user="root",
        password="Sneha@12345",
        database="hmm"
    )