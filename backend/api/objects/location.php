<?php

// location object represents a physical location.
// contains infomation that will be displayed on the client side
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

    // read all locations availble in the database
    public function getAll(){
    
        // select all query
        $query = "SELECT id, address, postalCode, capacity, parkingType, lat, lng FROM " . $this->table_name . ";";

        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    //search by address
    public function getByAddress($address){

        //query to select by locations id
        $query = "SELECT LOCATIONS.id, address, postalCode, capacity, parkingType, lat, lng, AVG(CHAR_LENGTH(REVIEWS.rating)) AS avgRating
        FROM REVIEW_TO_LOCATION 
        INNER JOIN REVIEWS ON rev_id=REVIEWS.id 
        INNER JOIN LOCATIONS ON loc_id=LOCATIONS.id
        WHERE LOCATIONS.address=\"$address\"
        GROUP BY LOCATIONS.id;
        ";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();
        return $stmt;
    }

    // search by rating
    public function getByRating($rating){
        $query = "SELECT LOCATIONS.id, address, postalCode, capacity, parkingType, lat, lng, AVG(CHAR_LENGTH(REVIEWS.rating)) AS avgRating
        FROM REVIEW_TO_LOCATION 
        INNER JOIN REVIEWS ON rev_id=REVIEWS.id 
        INNER JOIN LOCATIONS ON loc_id=LOCATIONS.id
        GROUP BY LOCATIONS.id;
        ";
        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();
        return $stmt;
    }

    // get location information by location id
    public function getByID($id){
        try {
            $query = "SELECT id, address, postalCode, capacity, parkingType, lat, lng FROM " . $this->table_name . " WHERE id=" . $id . ";";

            // prepare query statement
            $stmt = $this->conn->prepare($query);

            // execute query
            $stmt->execute();
            return $stmt;
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }
    }

    // gets location id by latitude and longitude
    public function getID_Coord($lat, $lng){

        // all latitudes and longitudes are stored as Deciman with 5 decimal places
        $lat = round($lat, 5);
        $lng = round($lng, 5);
        try {
            // allow tolerance
            $lat_lower_bound = $lat - 0.00001;
            $lat_upper_bound = $lat + 0.00001;
            $lng_lower_bound = $lng - 0.00001;
            $lng_upper_bound = $lng + 0.00001;

            $query = "SELECT id FROM " . $this->table_name . " WHERE (lat BETWEEN " . $lat_lower_bound . " AND " . $lat_upper_bound . ") AND (lng BETWEEN " . $lng_lower_bound . " AND " . $lng_upper_bound . ");";
            
            // prepare statement
            $stmt = $this->conn->prepare($query);
            $stmt->execute();

            // fetch id in the database
            $loc_id = $stmt->fetch(PDO::FETCH_ASSOC)["id"];

            // checks if there is a result
            if (is_null($loc_id)) return null;
            return $loc_id;
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }
    }

    // checks if a location exists in the database
    // the location is distinguished by address and parking type
    // there could be many different types of bike parking spot located on the same street
    public function checkLocExists($address, $parkingType){
        try{
            $query = "SELECT id FROM LOCATIONS WHERE upper(address)=\"$address\" and upper(parkingType)=\"$parkingType\"";

            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            
            $loc_id = $stmt->fetch(PDO::FETCH_ASSOC)["id"];
            return $loc_id;
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }

    }

    // creates a new location in the database
    public function create($address, $parkingType, $capacity, $lat, $lng){

        // check if the location exists or not
        $loc_id = $this->checkLocExists($address, $parkingType);
        if (!is_null($loc_id)) return $loc_id;

        // round latitude and longitude to 5 decimal places
        $lat = round($lat, 5);
        $lng = round($lng, 5);
        try{
            $query = "INSERT INTO LOCATIONS (address, parkingType, capacity, lat, lng) VALUES(\"$address\", \"$parkingType\", $capacity, $lat, $lng);";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();

            // get the last inserted id
            $loc_id = $this->conn->lastInsertId();
            return $loc_id;
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }
    }
}
?>