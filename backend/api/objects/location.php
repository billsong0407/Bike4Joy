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

    // read locations
    public function getAll(){
    
        // select all query
        $query = "SELECT id, address, postalCode, capacity, parkingType, lat, lng FROM " . $this->table_name . ";";
        
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    public function getByID($id){
        try {
            $query = "SELECT * FROM " . $this->table_name . " WHERE id=" . $id . ";";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt;
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }
    }

    public function getID($address){
        try {
            $query = "SELECT id FROM " . $this->table_name . " WHERE address=" . $address . ";";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            $loc_id = $stmt->fetch(PDO::FETCH_ASSOC)["id"];
            return $loc_id;
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }
    }

    public function getID_Coord($lat, $lng){
        $lat = round($lat, 5);
        $lng = round($lng, 5);
        try {
            $lat_lower_bound = $lat - 0.00001;
            $lat_upper_bound = $lat + 0.00001;
            $lng_lower_bound = $lng - 0.00001;
            $lng_upper_bound = $lng + 0.00001;
            $query = "SELECT id FROM " . $this->table_name . " WHERE (lat BETWEEN " . $lat_lower_bound . " AND " . $lat_upper_bound . ") AND (lng BETWEEN " . $lng_lower_bound . " AND " . $lng_upper_bound . ");";
            // echo $query . "\n";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            $loc_id = $stmt->fetch(PDO::FETCH_ASSOC)["id"];
            if (is_null($loc_id)) return null;
            return $loc_id;
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }
    }

    public function create($address, $postalCode, $lat, $lng, $parkingType, $capacity, $bikeSize, $yearInstalled){
        $loc_id = $this->getID_Coord($lat, $lng);
        echo $loc_id . "\n";
        if (is_null($loc_id)) {
            $loc_id = $this->getID($address);
        }
        if (!is_null($loc_id)){
            return $loc_id;
        }
        echo $loc_id . "\n";
        try{
            $query = "INSERT INTO LOCATIONS (address, postalCode, parkingType, capacity, lat, lng, bikeSize, yearInstalled) VALUES($address, $postalCode, $parkingType, $capacity, $lat, $lng, $bikeSize, $yearInstalled);";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            
            $new_id = $this->getID_Coord($lat, $lng);
            return $new_id;
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }
    }
}
?>