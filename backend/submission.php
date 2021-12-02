<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type, Authorization");
$postdata = file_get_contents("php://input");

$servername = "";
$username = "";
$sqlpassword = "";

$request = json_decode($postdata);

$address = $request->address;
$postalCode = NULL;
$longitude = $request->longitude;
$latitude = $request->latitude;
$type = $request->type;
$capacity = $request->capacity;
$yearInstalled = NULL;
$image = NULL;
$video = NULL;
$comment = $request->description;
$userid = NULL; //storing userid and pass to this page
$rating = $request->rating;

// include "location.php";
// $locationClass = new Location();
// $realLocationId = $locationClass->create($address, $postalCode, $latitude, $longitude, $type, $capacity, $yearInstalled);
// echo $realLocationId;

 
try {
  $pdo = new PDO("mysql:host=$servername;dbname=bike4joy", $username, $sqlpassword);
  // set the PDO error mode to exception
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  echo "Connected successfully";

 
    $sql = "INSERT INTO REVIEWS VALUES(0, '$image', '$video','$comment', 20, '$rating')"; //the 20 is the temp userid 
    // use exec() because no results are returned
    $pdo->exec($sql);
    echo " New record created successfully";
   //Find review id corresponding to the query submitted
   $lookFor = $comment;
   $reviewid = "SELECT id FROM REVIEWS WHERE comment = :commentcheck";
   $stmt3 = $pdo->prepare($reviewid);
   $stmt3->bindValue(':commentcheck', $lookFor);
   $stmt3->execute();
   $realReviewId = $stmt3->fetch(PDO::FETCH_ASSOC)["id"];
   echo $realReviewId; //<-- returned reviewid

} catch(PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}
?>