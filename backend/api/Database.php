<?php

class DatabaseController {
    private $connection = null;

    public function __construct(){
        /* Attempt MySQL server connection. */
        $credentials = json_decode(file_get_contents('../config.json'), true);
        $host = $credentials["DB_ADDRESS"];
        $database = $credentials["DB_NAME"];
        $username = $credentials["DB_USERNAME"];
        $password = $credentials["DB_PASSWORD"];
        $port = $credentials["DB_PORT"];

        try{
            $this->connection = new PDO("mysql:host=$host;dbname=$database;port=$port", $username, $password);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            echo "Error Connecting the Database: " . $e->getMessage() . "\n";
        }
    }

    public function getConnection(){
        return $this->connection;
    }

    public function disconnect(){
        $this->connection = null;
    }

    public function readSQL($query){
        try{
            $query = $this->connection->prepare($query);
            $query->execute();
            $query->setFetchMode(PDO::FETCH_ASSOC);
            $result = $query->fetchAll();
            return $result;
        } catch (Exception $e){
            exit($e->getMessage());
        }
    }
}
?>