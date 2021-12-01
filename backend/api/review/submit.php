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

// instantiate database and location object
$database = new DatabaseController();
$db = $database->getConnection();

// initialize object
$review = new Review($db);

// query locations
$address = isset($_GET["address"]) ? $_GET["address"] : "";
$parkingType = isset($_GET["parkingType"]) ? $_GET["parkingType"] : "";
$capacity = isset($_GET["capacity"]) ? $_GET["capacity"] : "";
$lat = isset($_GET["lat"]) ? $_GET["lat"] : "";
$lng = isset($_GET["lng"]) ? $_GET["lng"] : "";

$rating = isset($_GET["rating"]) ? $_GET["rating"] : "";
$description = isset($_GET["description"]) ? $_GET["description"] : "";
$user_id = isset($_GET["userID"]) ? $_GET["userID"] : "";

echo "\"$imgName\" - \"$rating\" - \"$description\" - \"$video\" - \"$user_id\"\n";

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

//keyName could be set to anything
$t=time();
date_default_timezone_set('America/New_York');
$timestamp = date("Y-m-d-H-i-s",$t);
// echo $_FILES . "\n";
$keyName = $timestamp ."-" . basename($_FILES["imgFile"]['name']);
echo $keyName . "\n";

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
    $imageUrl = $result['ObjectURL']; //<--returned image url

    //catch errors
} catch (S3Exception $e) {
    die('Error:' . $e->getMessage());
} catch (Exception $e) {
    die('Error:' . $e->getMessage());
}


echo 'Done ';
echo $imageUrl;
?>