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

// parameters from api
$address= isset($_GET["address"]) ? $_GET["address"] : "";
$rating = isset($_GET["rating"]) ? $_GET["rating"] : "";

if (!$address && !$rating){
    http_response_code(404);

    echo json_encode(
        array("message" => "Invalid Rating.")
    );
    return;
}
else if ($address){
    if (is_numeric($address)){
        http_response_code(404);

        echo json_encode(
            array("message" => "Invalid Address.")
        );
        return;
    }
    $stmt = $location->getByAddress($address);
    $num = $stmt->rowCount();   
    if($num>0){
  
        // locations array
        $locations_arr=array();
        $locations_arr["results"]=array();
    
        // retrieve our table contents
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            // extract row
            // this will make $row['name'] to
            // just $name only
            extract($row);
  
            $location_item=array(
                "id" => $id,
                "ADDRESS" => $address,
                "POSTAL_CODE" => $postalCode,
                "lat" => $lat,
                "lng" => $lng,
                "BICYCLE_CAPACITY" => $capacity,
                "PARKING_TYPE" => $parkingType,
                "AVG_RATING" => round($avgRating),
            );
    
            array_push($locations_arr["results"], $location_item);
        }
    
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
}
else if ($rating){
    if (!is_numeric($rating)){
        http_response_code(404);

        echo json_encode(
            array("message" => "Invalid Rating.")
        );
        return;
    }
    
    // Search in the database by grouping location with its reviews
    $stmt = $location->getByRating($rating);
    $num = $stmt->rowCount();   
    if($num>0){
  
        // locations array
        $locations_arr=array();
        $locations_arr["results"]=array();
    
        // retrieve our table contents
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            
            // if the average rating of the location does not match with the query rating
            if (round($row["avgRating"]) != $rating){
                // remove from the results
                continue;
            }

            // extract row
            extract($row);
  
            $location_item=array(
                "id" => $id,
                "ADDRESS" => $address,
                "POSTAL_CODE" => $postalCode,
                "lat" => $lat,
                "lng" => $lng,
                "BICYCLE_CAPACITY" => $capacity,
                "PARKING_TYPE" => $parkingType,
                "AVG_RATING" => round($avgRating),
            );
    
            array_push($locations_arr["results"], $location_item);
        }
    
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
}
?>