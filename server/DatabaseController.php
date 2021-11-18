<?php

class DatabaseController {
    private $connection = null;

    public function __construct(){
        /* Attempt MySQL server connection. */
        $credentials = json_decode(file_get_contents('./config.json'), true);
        $host = $credentials["DB_ADDRESS"];
        $database = $credentials["DB_NAME"];
        $username = $credentials["DB_USERNAME"];
        $password = $credentials["DB_PASSWORD"];
        $port = $credentials["DB_PORT"];
        $this->connection = new mysqli($host, $username, $password, $database, $port);

        // Check connection
        if($this->connection === false){
            die("ERROR: Could not connect. " . $this->connection->connect_error . "\n");
        }

        // Print host information
        echo "Connect Successfully. Host info: " . $this->connection->host_info . "\n";
    }

    public function getConnection(){
        return $this->connection;
    }

    public function disconnect(){
        $this->connection->close();
    }

    public function readSQL($query){
        try{
            $result = $this->connection->query($query);
            return $result;
        } catch (Exception $e){
            exit($e->getMessage());
        }
    }
}
?>