<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
  
// include database and object files
include_once '../database.php';
include_once '../objects/location.php';
  
// instantiate database and location object
$database = new DatabaseController();
$db = $database->getConnection();

// initialize object
$location = new Location($db);

// query locations
// $sample_address = "236 Augusta Ave";
$address=isset($_GET["address"]) ? $_GET["address"] : "";

if ((!$address) && gettype($address) != string){
    echo json_encode(
        array("message" => "Invalid Address Type.")
    );
    return;
}
$loc_id = $location->getID($address);

if(!is_null($loc_id)){
  
    // locations array
    $locations_arr=array();
    $locations_arr["results"]=array();
  
    $location_item=array(
        "id" => $loc_id,
    );

    array_push($locations_arr["results"], $location_item);
    
    // set response code - 200 OK
    http_response_code(200);
  
    // show locations data in json format
    echo json_encode($locations_arr);
}
  
else{
  
    // set response code - 404 Not found
    http_response_code(404);
  
    // tell the user no locations found
    echo json_encode(
        array("message" => "No locations found.")
    );
}

?>