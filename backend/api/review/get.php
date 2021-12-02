<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
  
// include database and object files
include_once '../database.php';
include_once '../objects/review.php';
  
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