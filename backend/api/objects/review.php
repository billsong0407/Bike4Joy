<?php

class Review {
    private $conn;
    private $table_name = "REVIEWS";

    public $id;
    public $image;
    public $video;
    public $rating;
    public $comment;
    public $user_id;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    public function getReviews($loc_id){
        try{
            $query = "SELECT rating, comment, image, video, name FROM REVIEW_TO_LOCATION INNER JOIN REVIEWS ON rev_id=REVIEWS.id INNER JOIN USERS on REVIEWS.user_id=USERS.id WHERE loc_id=$loc_id;";
            
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt;
        } catch (\PDOException $e) {
            return "error";
            exit($e->getMessage());
        }
    }

    public function create($image, $video, $rating, $description, $userID){
        try{
            $query = "SELECT MAX(id) FROM REVIEWS WHERE image=\"$image\" and video=\"$video\" and rating=\"$rating\" and comment=\"$description\" and user_id==\"$userID\";";
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