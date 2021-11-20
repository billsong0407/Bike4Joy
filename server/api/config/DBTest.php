<?php

include 'Database.php';

$dbConnection = new DatabaseController();

$statement = "SELECT id, address, postalCode from LOCATIONS LIMIT 10;";
$result = $dbConnection->readSQL($statement);

foreach ($result as $row){
    echo $row['id'] . " - " . $row['address'] . " - " . $row['postalCode'] . "\n" ;
}

?>