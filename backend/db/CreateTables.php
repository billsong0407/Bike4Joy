<?php

$credentials = json_decode(file_get_contents('../config.json'), true);
$host = $credentials["DB_ADDRESS"];
$database = $credentials["DB_NAME"];
$username = $credentials["DB_USERNAME"];
$password = $credentials["DB_PASSWORD"];
$port = $credentials["DB_PORT"];
// $connection = new mysqli($host, $username, $password, $database, $port);
try{
    $conn = new PDO("mysql:host=$host;dbname=$database;port=$port", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

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

    $CREATE_LOCATIONS_TABLE_QUERY = $conn->prepare($CREATE_LOCATIONS_TABLE_QUERY);
    $CREATE_LOCATIONS_TABLE_QUERY->execute();
} catch(PDOException $e) {
    echo "Error at creating LOCATIONS table: " . $e->getMessage() . "\n";
}

try{
    $CREATE_USERS_TABLE_QUERY = "
    CREATE TABLE USERS (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        PRIMARY KEY (id, name, email) 
    )";
    
    $CREATE_USERS_TABLE_QUERY = $conn->prepare($CREATE_USERS_TABLE_QUERY);
    $CREATE_USERS_TABLE_QUERY->execute();
} catch(PDOException $e) {
    echo "Error at creating USERS table: " . $e->getMessage() . "\n";
}

try{
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

    $CREATE_REVIEWS_TABLE_QUERY = $conn->prepare($CREATE_REVIEWS_TABLE_QUERY);
    $CREATE_REVIEWS_TABLE_QUERY->execute();
} catch(PDOException $e) {
    echo "Error at creating REVIEWS table: " . $e->getMessage() . "\n";
}

try{
    $CREATE_RELATIONS_TABLE_QUERY = "
    CREATE TABLE REVIEW_TO_LOCATION (
        loc_id INT NOT NULL,
        rev_id INT NOT NULL,
        FOREIGN KEY (loc_id) REFERENCES LOCATIONS(id) on delete cascade,
        FOREIGN KEY (rev_id) REFERENCES REVIEWS(id) on delete cascade
    )";

    $CREATE_RELATIONS_TABLE_QUERY = $conn->prepare($CREATE_RELATIONS_TABLE_QUERY);
    $CREATE_RELATIONS_TABLE_QUERY->execute();
} catch(PDOException $e) {
    echo "Error at creating REVIEW_TO_LOCATION table: " . $e->getMessage() . "\n";
}


$conn = null;
echo "Exiting Database\n"
?>