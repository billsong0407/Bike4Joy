<?php

// database controller responsible for connecting to database and perform sql operations
class DatabaseController {
    private $connection = null;

    public function __construct(){
        # get database credentials
        $credentials = json_decode(file_get_contents('../../config.json'), true);
        //sets database credential properties
        $host = $credentials["DB_ADDRESS"];
        $database = $credentials["DB_NAME"];
        $username = $credentials["DB_USERNAME"];
        $password = $credentials["DB_PASSWORD"];
        $port = $credentials["DB_PORT"];

        /* Attempt MySQL server connection. */
        try{
            $this->connection = new PDO("mysql:host=$host;dbname=$database;port=$port", $username, $password);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            //unable to connect
        } catch(PDOException $e) {
            echo "Error Connecting the Database: " . $e->getMessage() . "\n";
        }
    }

    // get database connection
    public function getConnection(){
        return $this->connection;
    }

    // disconnect from the database
    public function disconnect(){
        $this->connection = null;
    }

    // provides functionality to execute queries
    public function readSQL($query){
        try{
            // prepare statement
            $query = $this->connection->prepare($query);

            // execute query
            $query->execute();

            // return results
            $query->setFetchMode(PDO::FETCH_ASSOC);
            $result = $query->fetchAll();
            return $result;
        } catch (Exception $e){
            exit($e->getMessage());
        }
    }
}
?>