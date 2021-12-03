<?php

//mysql database controller class
class DatabaseController {
    private $connection = null;

    public function __construct(){
        /* Attempt MySQL server connection. */
        $credentials = json_decode(file_get_contents('../../config.json'), true);
        //sets database credential properties
        $host = $credentials["DB_ADDRESS"];
        $database = $credentials["DB_NAME"];
        $username = $credentials["DB_USERNAME"];
        $password = $credentials["DB_PASSWORD"];
        $port = $credentials["DB_PORT"];
        //makes mysql connection
        try{
            $this->connection = new PDO("mysql:host=$host;dbname=$database;port=$port", $username, $password);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            //unable to connect
        } catch(PDOException $e) {
            echo "Error Connecting the Database: " . $e->getMessage() . "\n";
        }
    }

    //function to get what connection is
    public function getConnection(){
        return $this->connection;
    }

    //function to disconnect from database
    public function disconnect(){
        $this->connection = null;
    }

    //default function to make a query execution
    public function readSQL($query){
        try{
            // prepare query statement
            $query = $this->connection->prepare($query);

            // execute query
            $query->execute();

            //save query variable
            $query->setFetchMode(PDO::FETCH_ASSOC);
            $result = $query->fetchAll();
            return $result;
        } catch (Exception $e){
            exit($e->getMessage());
        }
    }
}
?>