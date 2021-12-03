<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require 'vendor/autoload.php';
use Aws\S3\S3Client;
use Aws\S3\Exception\S3Exception;


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

    public function create($address, $parkingType, $capacity, $lat, $lng){
        $loc_id = $this->checkLocExists($address, $parkingType);
        if (!is_null($loc_id)) return $loc_id;
        $lat = round($lat, 5);
        $lng = round($lng, 5);
        try{
            $query = "INSERT INTO LOCATIONS (address, parkingType, capacity, lat, lng) VALUES(\"$address\", \"$parkingType\", $capacity, $lat, $lng);";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();

            $loc_id = $this->conn->lastInsertId();
            return $loc_id;
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }
    }
}

class Review {
    private $conn;
    private $table_name = "REVIEWS";

    public $id;
    public $image;
    public $video;
    public $rating;
    public $comment;
    public $user_id;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    public function createReview($locID, $image, $video, $rating, $description, $userID){
        try{
            $query = "INSERT INTO REVIEWS(image, video, comment, rating, user_id) VALUES (\"$image\", \"$video\", \"$description\", \"$rating\", $userID);";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();

            $rev_id = $this->conn->lastInsertId();

            $query = "INSERT INTO REVIEW_TO_LOCATION(loc_id, rev_id) VALUES ($locID, $rev_id)";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return "success";
        } catch (\PDOException $e) {
            return false;
            exit($e->getMessage());
        }
    }
}

// instantiate database and location object
$database = new DatabaseController();
$db = $database->getConnection();

// initialize object
$location = new Location($db);
$review = new Review($db);

// query locations
$address = isset($_GET["address"]) ? strtoupper($_GET["address"]) : "";
$parkingType = isset($_GET["parkType"]) ? strtoupper($_GET["parkType"]) : "";
$capacity = isset($_GET["capacity"]) ? $_GET["capacity"] : "";
$lat = isset($_GET["lat"]) ? $_GET["lat"] : "";
$lng = isset($_GET["lng"]) ? $_GET["lng"] : "";

// location input validation
if (is_numeric($address) OR is_numeric($parkingType) OR !is_numeric($lat) OR !is_numeric($lng) OR empty($address) OR empty($parkingType) OR empty($lat) OR empty($lng)){
    // set response code
    http_response_code(404);

    echo json_encode(
        array("message" => "Invalid Input Type.")
    );
    return;
}

$rating = isset($_GET["rating"]) ? $_GET["rating"] : "";
$description = isset($_GET["description"]) ? $_GET["description"] : "";
$user_id = isset($_GET["userID"]) ? $_GET["userID"] : "";

// review input validation
if (!is_numeric($user_id) OR empty($user_id) OR empty($rating)){
    // set response code
    http_response_code(404);

    echo json_encode(
        array("message" => "Invalid Input Type.")
    );
    return;
}

// check if image or video is uploaded
$is_image = false;
$is_video = false;
$imageUrl = "";
$videoUrl = "";
if (!is_null($_FILES["imgFile"]['tmp_name'])){
    $file_name = basename($_FILES["imgFile"]['name']);
    $file = $_FILES["imgFile"]['tmp_name'];
    $is_image = true;
} else if (!is_null($_FILES["vidFile"]['tmp_name'])){
    $file_name = basename($_FILES["vidFile"]['name']);
    $file = $_FILES["vidFile"]['tmp_name'];
    $is_video = true;
} else{
    $file_name = "";
    $file = null;
}

// due to limited storage in s3, we only store one of the image or video
if ($is_image || $is_video){
    // AWS Info
    $bucketName = '';
    $IAM_KEY = '';
    $IAM_SECRET = '';

    // Connect to AWS
    try {
        $s3 = S3Client::factory(
            array(
                'credentials' => array(
                    'key' => $IAM_KEY,
                    'secret' => $IAM_SECRET
                ),
                'version' => 'latest',
                //change region if doesnt work
                'region'  => 'us-east-2'
            )
        );
    } catch (Exception $e) {
        die("Error: " . $e->getMessage());
    }

    // hash file with current timestamp
    $t=time();
    date_default_timezone_set('America/New_York');
    $timestamp = date("Y-m-d-H-i-s",$t);
    $keyName = $timestamp ."-" . $file_name;
    
    // AWS s3 path
    $pathInS3 = 'https://s3.us-east-2.amazonaws.com/' . $bucketName . '/' . $keyName;

    // Add it to S3
    try {
        // Uploaded:
        $file = $_FILES["imgFile"]['tmp_name'];

        $result = $s3->putObject(
            array(
                'Bucket'=>$bucketName,
                'Key' =>  $keyName,
                'SourceFile' => $file,
                //this this on public read
                'ACL' => 'public-read' 
            )
        );
    if ($is_image) $imageUrl = $result['ObjectURL']; //<--returned image url
    else $videoUrl = $result['ObjectURL']; //<--returned video url
        

        //catch errors
    } catch (S3Exception $e) {
        die('Error:' . $e->getMessage());
    } catch (Exception $e) {
        die('Error:' . $e->getMessage());
    }
}

// fetch location id from the database based on the info provided
$loc_id = $location->create($address, $parkingType, $capacity, $lat, $lng);

// appends review data in the database and check if operation is successfull
$result = $review->createReview($loc_id, $imageUrl, $videoUrl, $rating, $description, $user_id);
if ($result){
    http_response_code(200);
    echo json_encode(
        array("message" => "successful submission")
    );
} else {
    // set response code - 404 Not found
    http_response_code(404);
  
    // tell the user no reviews found
    echo json_encode(
        array("message" => "submission failed")
    );
}
?>