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

    public function createReview($locID, $image, $video, $rating, $description, $userID){
        try{
            $query = "INSERT INTO REVIEWS(image, video, comment, rating, user_id) VALUES (\"$image\", \"$video\", \"$description\", \"$rating\", $userID);";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();

            $rev_id = $this->conn->lastInsertId();

            $query = "INSERT INTO REVIEW_TO_LOCATION(loc_id, rev_id) VALUES ($locID, $rev_id)";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return "success";
        } catch (\PDOException $e) {
            return false;
            exit($e->getMessage());
        }
    }
}

?>