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

// input validation: 
if (is_numeric($email) OR is_numeric($password) OR is_numeric($name) OR empty($email) OR empty($password) OR empty($name)) {
    // set response code
    http_response_code(404);
  
    // tell the user invalid input type
    echo json_encode(
        array("message" => "invalid input type")
    );
    return;
}

// check if user is registered in the database first
$check = $user->isUser($email);

// when the submitted infomation is new to to the database
if($check == False){

    // appends the user information into the database and gets the user id
    $user_id = $user->registerUser($name, $email, $password);
    
    // result array
    $user_arr=array();
    $user_arr["results"] = $user_id;
    $user_arr["message"] = "User just registered";

    // set response code - 200 OK
    http_response_code(200);
  
    // show locations data in json format
    echo json_encode($user_arr);

}

// when the submitted info exists in the database
else if ($check == True){
  
    // set response code - 404 Not found
    http_response_code(200);
  
    // tell the user that email exists and should log in instead
    echo json_encode(
        array("message" => "User already registered")
    );
}

// otherwise it is a server error
else{
  
    // set response code - 404 Not found
    http_response_code(404);
  
    // tell the user no locations found
    echo json_encode(
        array("message" => "Something wrong with the database")
    );
}

?>