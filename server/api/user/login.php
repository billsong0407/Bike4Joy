<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
  
class DatabaseController {
    private $connection = null;

    public function __construct(){
        /* Attempt MySQL server connection. */
        $host = "bike4joy-database.cvcxjrsjyuuy.us-east-2.rds.amazonaws.com";
        $database = "";
        $username = "";
        $password = "";
        $port = 3306;
        try{
            $this->connection = new PDO("mysql:host=$host;dbname=$database;port=$port", $username, $password);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            echo "Error Connecting the Database: " . $e->getMessage() . "\n";
        }
    }

    public function getConnection(){
        return $this->connection;
    }
}

class User {
    private $conn;
    private $table_name = "USERS";

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    public function isUser($email){
        try{
            $query = "SELECT id FROM $this->table_name WHERE email=\"$email\";";
            
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            $user_id = $stmt->fetch(PDO::FETCH_ASSOC)["id"];

            if (is_null($user_id)) return false;
            return true;
        } catch (\PDOException $e) {
            return "error";
            exit($e->getMessage());
        }
    }

    public function logIn($email, $password){
        try{
            $query = "SELECT id FROM USERS WHERE email=\"$email\" and userPassword=\"$password\";";
            // echo $query . "\n";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            $user_id = $stmt->fetch(PDO::FETCH_ASSOC)["id"];
            // echo $user_id . "\n";
            if (is_null($user_id)) return null;
            return $user_id;
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }
    }
}
  
// instantiate database and location object
$database = new DatabaseController();
$db = $database->getConnection();

// initialize object
$user = new User($db);

// query locations
$email = isset($_GET["email"]) ? $_GET["email"] : "";
$password = isset($_GET["userPassword"]) ? $_GET["userPassword"] : "";

// input validation: 
if (is_numeric($email) OR is_numeric($password) OR empty($email) OR empty($password)) {
    // set response code
    http_response_code(404);
  
    // tell the user invalid input type
    echo json_encode(
        array("message" => "invalid input type")
    );
    return;
}

// search in the database through function
$user_id = $user->logIn($email, $password);

if(!is_null($user_id)){
  
    // results array
    $user_arr=array();
    $user_arr["results"] = $user_id;
    $user_arr["message"] = "success";
    
    // // set response code - 200 OK
    http_response_code(200);
  
    // // show user data in json format
    echo json_encode($user_arr);
}  
else{
  
    // set response code - 404 Not found
    http_response_code(404);
  
    // tell the user no locations found
    echo json_encode(
        array("message" => "invalid email or password")
    );
}

?>