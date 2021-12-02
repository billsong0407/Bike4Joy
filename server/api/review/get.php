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

    public function getReviews($loc_id){
        try{
            $query = "SELECT rating, comment, image, video, name FROM REVIEW_TO_LOCATION INNER JOIN REVIEWS ON rev_id=REVIEWS.id INNER JOIN USERS on REVIEWS.user_id=USERS.id WHERE loc_id=$loc_id;";
            
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt;
        } catch (\PDOException $e) {
            return "error";
            exit($e->getMessage());
        }
    }
}
  
// instantiate database
$database = new DatabaseController();
$db = $database->getConnection();

// initialize object
$review = new Review($db);

// query locations
$loc_id = isset($_GET["id"]) ? $_GET["id"] : "";

// input validation
if (!is_numeric($loc_id) OR empty($loc_id)){
    // set response code
    http_response_code(404);

    echo json_encode(
        array("message" => "Invalid Input Type.")
    );
    return;
}

// get validated sql statement, it contains review data from the database
$stmt = $review->getReviews($loc_id);
$num = $stmt->rowCount();
  
// check if there is a review
if($num>0){
  
    // reviews array
    $reviews_arr=array();
    $reviews_arr["results"]=array();
  
    // retrieve our table contents
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
  
        $review_item=array(
            "RATING" => $rating,
            "COMMENT" => $comment,
            "USERNAME" => $name,
            "IMAGE" => $image,
            "VIDEO" => $video,
        );

        // appends to review array
        array_push($reviews_arr["results"], $review_item);
    }
  
    // set response code - 200 OK
    http_response_code(200);
  
    // show review data in json format
    echo json_encode($reviews_arr);
}
  
else{
  
    // set response code - 404 Not found
    http_response_code(404);
  
    // tell the user no reviews found
    echo json_encode(
        array("message" => "no reviews found.")
    );
}

?>