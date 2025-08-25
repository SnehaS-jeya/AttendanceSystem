import pymysql


def get_db_connection():
    return pymysql.connect(
        host="localhost",
        user="root",
        password="Sneha@12345",
        database="hmm"
    )
# test , test1@gmail -> 0258
# test2 -> 0147
