<?php

class Review {
    private $conn;
    private $table_name = "REVIEWS";

    public $id;
    public $image;
    public $video;
    public $rating;
    public $description;
    public $user_id;

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

    public function create($image, $video, $rating, $description, $userID){
        try{
            $query = "SELECT MAX(id) FROM REVIEWS WHERE image=\"$image\" and video=\"$video\" and rating=\"$rating\" and description=\"$description\" and userID==\"$userID\";";
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