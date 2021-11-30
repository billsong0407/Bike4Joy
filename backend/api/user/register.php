<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
  
// include database and object files
include_once '../database.php';
include_once '../objects/user.php';
  
// instantiate database and location object
$database = new DatabaseController();
$db = $database->getConnection();

// initialize object
$user = new User($db);

// query locations
$name = isset($_GET["name"]) ? $_GET["name"] : "";
$email = isset($_GET["email"]) ? $_GET["email"] : "";
$password = isset($_GET["userPassword"]) ? $_GET["userPassword"] : "";
$check = $user->isUser($email);
if($check == False){
    $user_id = $user->registerUser($name, $email, $password);
    
    $user_arr=array();
    $user_arr["results"] = $user_id;
    $user_arr["message"] = "User just registered";
    // // set response code - 200 OK
    http_response_code(200);
  
    // // show locations data in json format
    echo json_encode($user_arr);

}
else if ($check == True){
  
    // set response code - 404 Not found
    http_response_code(200);
  
    // tell the user no locations found
    echo json_encode(
        array("message" => "User already registered")
    );
}
  
else{
  
    // set response code - 404 Not found
    http_response_code(404);
  
    // tell the user no locations found
    echo json_encode(
        array("message" => "Something wrong with the database")
    );
}

?>