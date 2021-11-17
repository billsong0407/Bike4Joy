import json
from mysql.connector import connect, Error

if __name__ == "__main__" :
    with open("./config.json") as file:
        credentials = json.load(file)
        _host = credentials['DB_ADDRESS']
        _port = credentials["DB_PORT"]
        _database = credentials["DB_NAME"]
        _username = credentials["DB_USERNAME"]
        _password = credentials["DB_PASSWORD"]
    
    DROP_LOCATIONS_TABLE = "DROP TABLE LOCATIONS"
    
    try:
        with connect(
            host=_host,
            port=_port,
            user=_username,
            database=_database,
            password=_password,
        ) as connection:
            cursor = connection.cursor()
            cursor.execute(DROP_LOCATIONS_TABLE)
            # print(connection)
    except Error as e:
        print(e)

