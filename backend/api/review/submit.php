<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
  
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

$image = isset($_GET["imgFile"]) ? $_GET["imgFile"] : "";
$video = isset($_GET["videoFile"]) ? $_GET["videoFile"] : "";
$rating = isset($_GET["rating"]) ? $_GET["rating"] : "";
$description = isset($_GET["description"]) ? $_GET["description"] : "";
$user_id = isset($_GET["userID"]) ? $_GET["userID"] : "";

echo "\"$image\" - \"$rating\" - \"$description\" - \"$video\" - \"$user_id\""
?>