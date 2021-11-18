import json
from mysql.connector import connect, Error

if __name__ == "__main__" :
    with open("../config.json") as file:
        credentials = json.load(file)
        _host = credentials['DB_ADDRESS']
        _port = credentials["DB_PORT"]
        _database = credentials["DB_NAME"]
        _username = credentials["DB_USERNAME"]
        _password = credentials["DB_PASSWORD"]
    
    DROP_LOCATIONS_TABLE = "DROP TABLE LOCATIONS"
    DROP_REVIEWS_TABLE = "DROP TABLE REVIEWS"
    DROP_RELATIONS_TABLE = "DROP TABLE REVIEW_TO_LOCATION"
    DROP_USERS_TABLE = "DROP TABLE USERS"
    DROP_QUERY = """
SET FOREIGN_KEY_CHECKS = 0;
drop table if exists REVIEW_TO_LOCATION;
drop table if exists LOCATIONS;
drop table if exists REVIEWS;
SET FOREIGN_KEY_CHECKS = 1;
    """
    
    try:
        with connect(
            host=_host,
            port=_port,
            user=_username,
            database=_database,
            password=_password,
        ) as connection:
            cursor = connection.cursor()
            cursor.execute(DROP_USERS_TABLE)
            cursor.execute(DROP_RELATIONS_TABLE)
            cursor.execute(DROP_LOCATIONS_TABLE)
            cursor.execute(DROP_REVIEWS_TABLE)
            # print(connection)
    except Error as e:
        print(e)

