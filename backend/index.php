<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type, Authorization");
$postdata = file_get_contents("php://input");

$servername = "localhost";
$username = "root";
$sqlpassword = "";
$database= "bike4joy";

$request = json_decode($postdata);

$email = $request->email;
$password = $request->password;
 
// Create connection
$db = mysqli_connect($servername, $username, $sqlpassword, $database);
 

$query = "INSERT INTO users VALUES('$email','$password')";

if(mysqli_query($db, $query)){
  echo "Data has been inserted successfully";
}else{
  echo "Error entering data to database ";
  echo $email;
  echo $db->error;
}
?>