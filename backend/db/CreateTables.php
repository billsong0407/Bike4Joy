<?php
// Script used to create tables in the database
// it is not used in the local and deployed server
// it has no impacts on the live website

$credentials = json_decode(file_get_contents('../config.json'), true);

//sets PDO mysql credential properties
$host = $credentials["DB_ADDRESS"];
$database = $credentials["DB_NAME"];
$username = $credentials["DB_USERNAME"];
$password = $credentials["DB_PASSWORD"];
$port = $credentials["DB_PORT"];

try{
    //makes mysql connection
    $conn = new PDO("mysql:host=$host;dbname=$database;port=$port", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    //variable to create the location table query
    $CREATE_LOCATIONS_TABLE_QUERY = "
    CREATE TABLE LOCATIONS(
        id INT NOT NULL AUTO_INCREMENT,
        lat DECIMAL(10,5) NOT NULL,
        lng DECIMAL(10,5) NOT NULL,
        capacity TEXT,
        parkingType TEXT,
        address TEXT,
        postalCode TEXT,
        bikeSize FLOAT,
        yearInstalled INT,
        PRIMARY KEY (id)
    )";

    // prepare query statement
    $CREATE_LOCATIONS_TABLE_QUERY = $conn->prepare($CREATE_LOCATIONS_TABLE_QUERY);

    // execute query
    $CREATE_LOCATIONS_TABLE_QUERY->execute();
} catch(PDOException $e) {
    echo "Error at creating LOCATIONS table: " . $e->getMessage() . "\n";
}

try{
    //variable to create the users table query
    $CREATE_USERS_TABLE_QUERY = "
    CREATE TABLE USERS (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        userPassword VARCHAR(100) NOT NULL,
        PRIMARY KEY (id, email),
        UNIQUE (email) 
    )";
    
    // prepare query statement
    $CREATE_USERS_TABLE_QUERY = $conn->prepare($CREATE_USERS_TABLE_QUERY);

    // execute query
    $CREATE_USERS_TABLE_QUERY->execute();
} catch(PDOException $e) {
    echo "Error at creating USERS table: " . $e->getMessage() . "\n";
}

try{
    //variable to create the reviews table query
    $CREATE_REVIEWS_TABLE_QUERY = "
    CREATE TABLE REVIEWS (
        id INT NOT NULL AUTO_INCREMENT,
        image TEXT,
        video TEXT,
        comment TEXT,
        user_id INT NOT NULL,
        rating TEXT,
        PRIMARY KEY (id),
        FOREIGN KEY (user_id) REFERENCES USERS(id)
    )";

    // prepare query statement
    $CREATE_REVIEWS_TABLE_QUERY = $conn->prepare($CREATE_REVIEWS_TABLE_QUERY);

    // execute query
    $CREATE_REVIEWS_TABLE_QUERY->execute();
} catch(PDOException $e) {
    echo "Error at creating REVIEWS table: " . $e->getMessage() . "\n";
}

try{
    //variable to create the review to location (id relation) table query
    $CREATE_RELATIONS_TABLE_QUERY = "
    CREATE TABLE REVIEW_TO_LOCATION (
        loc_id INT NOT NULL,
        rev_id INT NOT NULL,
        FOREIGN KEY (loc_id) REFERENCES LOCATIONS(id) on delete cascade,
        FOREIGN KEY (rev_id) REFERENCES REVIEWS(id) on delete cascade
    )";

    // prepare query statement
    $CREATE_RELATIONS_TABLE_QUERY = $conn->prepare($CREATE_RELATIONS_TABLE_QUERY);

    // execute query
    $CREATE_RELATIONS_TABLE_QUERY->execute();
} catch(PDOException $e) {
    echo "Error at creating REVIEW_TO_LOCATION table: " . $e->getMessage() . "\n";
}

//break database connection
$conn = null;
echo "Exiting Database\n"
?>