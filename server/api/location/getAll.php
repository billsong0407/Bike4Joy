<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
  
// include database and object files

class DatabaseController {
    private $connection = null;

    public function __construct(){
        /* Attempt MySQL server connection. */
        // $credentials = json_decode(file_get_contents('../../config.json'), true);
        $host = "bike4joy-database.cvcxjrsjyuuy.us-east-2.rds.amazonaws.com";
        $database = "";
        $username = "";
        $password = "";
        $port = 3306;
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
}

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

    public function getLocationInfo($address){
        $query = "SELECT id, address, postalCode, capacity, parkingType, lat, lng FROM " . $this->table_name . " WHERE address='$address'" . ";";
        // echo $query . "\n";
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
        
        if (is_null($loc_id)) {
            $loc_id = $this->getID($address);
        }
        if (!is_null($loc_id)){
            return $loc_id;
        }
        
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
  
// instantiate database and location object
$database = new DatabaseController();
$db = $database->getConnection();

// initialize object
$location = new Location($db);

// query locations
$stmt = $location->getAll();
$num = $stmt->rowCount();
  
// check if more than 0 record found
if($num>0){
  
    // locations array
    $locations_arr=array();
    $locations_arr["results"]=array();
  
    // retrieve our table contents
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
  
        $location_item=array(
            "id" => $id,
            "ADDRESS" => $address,
            "POSTAL_CODE" => $postalCode,
            "lat" => $lat,
            "lng" => $lng,
            "BICYCLE_CAPACITY" => $capacity,
            "PARKING_TYPE" => $parkingType
        );
  
        array_push($locations_arr["results"], $location_item);
    }
  
    // set response code - 200 OK
    http_response_code(200);
  
    // show locations data in json format
    echo json_encode($locations_arr);
}
  
else{
  
    // set response code - 404 Not found
    http_response_code(404);
  
    // tell the user no locations found
    echo json_encode(
        array("message" => "No locations found.")
    );
}

?>