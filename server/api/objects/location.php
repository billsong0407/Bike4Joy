<?php
class Location{
  
    // database connection and table name
    private $conn;
    private $table_name = "LOCATIONS";
  
    // object properties
    public $id;
    public $lat;
    public $lng;
    public $capacity;
    public $parkingType;
    public $address;
    public $postalCode;
    public $bikeSize;
    public $yearInstalled;
  
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    // read products
    public function read(){
    
        // select all query
        $query = "SELECT id, address, postalCode FROM " . $this->table_name . " LIMIT 10;";
        
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }
}
?>