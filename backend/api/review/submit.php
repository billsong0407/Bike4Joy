<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require 'vendor/autoload.php';
use Aws\S3\S3Client;
use Aws\S3\Exception\S3Exception;
  
// include database and object files
include_once '../database.php';
include_once '../objects/review.php';
include_once '../objects/location.php';

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
    echo "here\n";
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

// check if a image file is attached
$is_image = false;
$imageUrl = "";
$videoUrl = "";
if (!is_null($_FILES["imgFile"]['tmp_name'])){
    $file_name = basename($_FILES["imgFile"]['name']);
    $file = $_FILES["imgFile"]['tmp_name'];
    $is_image = true;
} 
else{
    $file_name = "";
    $file = null;
}

// due to limited storage in s3, we only store one image per upload
if ($is_image){
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