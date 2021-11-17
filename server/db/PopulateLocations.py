# The purpose of this script is to initialize the database and populating the initial location data

import json
import mysql.connector
from mysql.connector import Error

if __name__ == "__main__" :
    # Load database credentials
    with open("../config.json") as file:
        credentials = json.load(file)
    _host = credentials['DB_ADDRESS']
    _port = credentials["DB_PORT"]
    _database = credentials["DB_NAME"]
    _username = credentials["DB_USERNAME"]
    _password = credentials["DB_PASSWORD"]
        
    # Load location data from the json file
    with open("./locations.json") as file:
        raw_data = json.load(file)
    locations = raw_data['parkingData'] 
    
    try:
        connection = mysql.connector.connect(host=_host,
                                    port=_port,
                                    database=_database,
                                    user=_username,
                                    password=_password)
        print("Connected")
        cursor = connection.cursor()
        
        cursor.execute("SHOW TABLES;")
        tables = cursor.fetchall()
        
        if tables and "LOCATIONS" in list(tables[0]):
            cursor.execute("DELETE FROM LOCATIONS") # reset LOCATION TABLE
            cursor.execute("DROP TABLE LOCATIONS")
            print("TABLE LOCATION DELETED")
            
        CREATE_TABLE_QUERY = """
CREATE TABLE LOCATIONS(
    id INT AUTO_INCREMENT PRIMARY KEY,
    lat TEXT,
    lng TEXT,
    capacity TEXT,
    parkingType TEXT,
    address TEXT,
    postalCode TEXT,
    bikeSize FLOAT,
    yearInstalled INT
)
"""
        cursor.execute(CREATE_TABLE_QUERY)
        connection.commit()    
        
        print("TABLE LOCATION CREATED")
        
        INSERT_QUERY = """
INSERT INTO LOCATIONS (address, postalCode, parkingType, capacity, lat, lng, bikeSize, yearInstalled)
VALUES
"""
        # Populate table
        for location in locations:
            properties = location["properties"]
            address = properties["ADDRESS_FULL"]
            postal_code = properties["POSTAL_CODE"]
            parking_type = properties["PARKING_TYPE"]
            capacity = properties["BICYCLE_CAPACITY"]
            bike_size = properties["SIZE_M"]
            year_installed = properties["YEAR_INSTALLED"]
            
            geometry = location["geometry"]["coordinates"]
            lat = geometry[1]
            lng = geometry[0]
            
            INSERT_QUERY += f'("{address}", "{postal_code}", "{parking_type}", {capacity}, "{lat}", "{lng}", {bike_size}, {year_installed}),\n'
            
        cursor.execute(INSERT_QUERY.rstrip().rstrip(','))
        connection.commit()
        print("ALL LOCATION DATA LOADED INTO BIKE4JOY DATABASE")
        
        if connection.is_connected():
            connection.cursor().close()
            connection.close()
            print("EXITING DATABASE")    
                
    except Error as e:
        print(e)