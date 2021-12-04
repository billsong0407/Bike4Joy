# The purpose of this script is to initialize the database and populating the initial location data
# it was ran before the server deployment
# it is not used in the local and deployed server at any time
# it has no impacts on the live website interactions

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
            # cursor.execute("DROP TABLE LOCATIONS")
            print("TABLE LOCATION DELETED")
        
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
            
            INSERT_QUERY += f'("{address}", "{postal_code}", "{parking_type}", {capacity}, {lat}, {lng}, {bike_size}, {year_installed}),\n'
            
        cursor.execute(INSERT_QUERY.rstrip().rstrip(','))
        connection.commit()
        print("ALL LOCATION DATA LOADED INTO BIKE4JOY DATABASE")
        
        INSERT_QUERY = """
INSERT INTO USERS(name, email, userPassword) VALUES 
("Franklin Tian", "fronk@discord.com", "fronkfronk123"),
("Jane Doe", "kirakirarinhm@gmail.com", "test123"),
("Frank Fonk", "fronk@godaddy.com", "bik4joy")
"""
        
        cursor.execute(INSERT_QUERY.rstrip())
        connection.commit()
        
        INSERT_QUERY = """
INSERT INTO REVIEWS(image, video, comment, rating, user_id) VALUES 
(\"\", \"\", "Good Place", \"★★★★★\", 1),
(\"https://ride4boybucket.s3.us-east-2.amazonaws.com/2021-12-01-11-30-29-rack.jpg\", \"\", "Excellent Environment", \"★★★★\", 2),
(\"\", \"\", "Looks pretty safe to park", \"★★★\", 3)
"""
        
        cursor.execute(INSERT_QUERY.rstrip())
        connection.commit()
        
        INSERT_QUERY = """
INSERT INTO REVIEW_TO_LOCATION(loc_id, rev_id) VALUES 
(2, 1),
(2, 2),
(2, 3)
"""
        
        cursor.execute(INSERT_QUERY.rstrip())
        connection.commit()
        
        if connection.is_connected():
            connection.cursor().close()
            connection.close()
            print("EXITING DATABASE")    
                
    except Error as e:
        print(e)