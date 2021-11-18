<?php

include 'DatabaseController.php';

$dbConnection = new DatabaseController();

$statement = "SELECT id, address, postalCode from LOCATIONS LIMIT 10;";
$result = $dbConnection->readSQL($statement);

if ($result->num_rows > 0){
    while ($row = $result->fetch_assoc()){
        echo $row["id"] . " - " . $row["address"] . " - " . $row["postalCode"] . "\n";
    }
}

?>