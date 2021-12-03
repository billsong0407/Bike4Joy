<?php

// user object represents a user
// contains infomation that will be displayed on the client side
class User {
    // database connection and table name
    private $conn;
    private $table_name = "USERS";

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    //function to check if the email is a valid user
    public function isUser($email){
        try{
            // query to get the user id of the users table
            // one user per email
            $query = "SELECT id FROM $this->table_name WHERE email=\"$email\";";

            // prepare query statement
            $stmt = $this->conn->prepare($query);

            // execute query
            $stmt->execute();

            // get user id
            $user_id = $stmt->fetch(PDO::FETCH_ASSOC)["id"];

            if (is_null($user_id)) return false;
            return true;
        } catch (\PDOException $e) {
            return "error";
            exit($e->getMessage());
        }
    }

    //function to register a given user
    public function registerUser($name, $email, $password){
        try{
            $query = "INSERT INTO USERS (name, email, userPassword) VALUES(\"$name\", \"$email\", \"$password\");";
            
            // prepare query statement
            $stmt = $this->conn->prepare($query);

            // execute query
            $stmt->execute();
            
            $query = "SELECT id FROM USERS WHERE name=\"$name\" and email=\"$email\" and userPassword=\"$password\";";
            
            // prepare query statement
            $stmt = $this->conn->prepare($query);

            // execute query
            $stmt->execute();

            //get user id and return it
            $user_id = $stmt->fetch(PDO::FETCH_ASSOC)["id"];
            return $user_id;
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }
    }

    //function to log in
    public function logIn($email, $password){
        try{
            //query to get user id from the exisiting table of users 
            $query = "SELECT id FROM USERS WHERE email=\"$email\" and userPassword=\"$password\";";
            // echo $query . "\n";
            $stmt = $this->conn->prepare($query);

            // execute query
            $stmt->execute();
            
            //get user id and retunr it
            $user_id = $stmt->fetch(PDO::FETCH_ASSOC)["id"];
            // echo $user_id . "\n";
            if (is_null($user_id)) return null;
            return $user_id;
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }
    }
}

?>