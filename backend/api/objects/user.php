<?php

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

    public function registerUser($name, $email, $password){
        try{
            $query = "INSERT INTO USERS (name, email, userPassword) VALUES(\"$name\", \"$email\", \"$password\");";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return;
            
            // $new_id = $this->getID_Coord($lat, $lng);
            // return $new_id;
        } catch (\PDOException $e) {
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

?>