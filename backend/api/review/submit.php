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
$capacity = isset($_GET["capacity"]) ? strtoupper($_GET["capacity"]) : "";
$lat = isset($_GET["lat"]) ? $_GET["lat"] : "";
$lng = isset($_GET["lng"]) ? $_GET["lng"] : "";

$loc_id = $location->create($address, $parkingType, $capacity, $lat, $lng);

$rating = isset($_GET["rating"]) ? $_GET["rating"] : "";
$description = isset($_GET["description"]) ? $_GET["description"] : "";
$user_id = isset($_GET["userID"]) ? $_GET["userID"] : "";

//keyName could be set to anything
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
    $t=time();
    date_default_timezone_set('America/New_York');
    $timestamp = date("Y-m-d-H-i-s",$t);
    $keyName = $timestamp ."-" . $file_name;
    // echo $keyName . "\n";

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

echo $imageUrl . "\n";
echo $videoUrl . "\n";
// $imageUrl = "https://ride4boybucket.s3.us-east-2.amazonaws.com/2021-12-01-11-30-29-rack.jpg";
// $videoUrl = "";

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