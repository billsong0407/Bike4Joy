<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
  
class DatabaseController {
    private $connection = null;

    public function __construct(){
        /* Attempt MySQL server connection. */
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

    public function getLocationInfo($address){
        $query = "SELECT id, address, postalCode, capacity, parkingType, lat, lng FROM " . $this->table_name . " WHERE address='$address'" . ";";
        // echo $query . "\n";
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }
}
  
// instantiate database and location object
$database = new DatabaseController();
$db = $database->getConnection();

// initialize object
$location = new Location($db);

$address=isset($_GET["address"]) ? $_GET["address"] : "";

if ((!$address) && gettype($address) != string){
    echo json_encode(
        array("message" => "Invalid Address Type.")
    );
    return;
}

// query locations
$stmt = $location->getLocationInfo($address);
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