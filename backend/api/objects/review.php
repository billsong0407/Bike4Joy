<?php

// review object represents a review submitted by an user.
// contains infomation that will be displayed on the client side
class Review {
    // database connection and table name
    private $conn;
    private $table_name = "REVIEWS";

    // object properties
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

    // function to get reviews
    public function getReviews($loc_id){
        try{
            // query to select few properties from the review_to_location table
            $query = "SELECT rating, comment, image, video, name FROM REVIEW_TO_LOCATION INNER JOIN REVIEWS ON rev_id=REVIEWS.id INNER JOIN USERS on REVIEWS.user_id=USERS.id WHERE loc_id=$loc_id;";
            
            // prepare query statement
            $stmt = $this->conn->prepare($query);

            // execute query
            $stmt->execute();
            return $stmt;
        } catch (\PDOException $e) {
            return "error";
            exit($e->getMessage());
        }
    }

    //function to create a review
    public function createReview($locID, $image, $video, $rating, $description, $userID){
        try{
            // query to insert a review into the reviews table
            // user can submit same reviews
            $query = "INSERT INTO REVIEWS(image, video, comment, rating, user_id) VALUES (\"$image\", \"$video\", \"$description\", \"$rating\", $userID);";

            // prepare query statement
            $stmt = $this->conn->prepare($query);

            // execute query
            $stmt->execute();

            $rev_id = $this->conn->lastInsertId();

            // also insert the reviewid and its corresponding locationid to the review_to_location table
            $query = "INSERT INTO REVIEW_TO_LOCATION(loc_id, rev_id) VALUES ($locID, $rev_id)";

            // prepare query statement
            $stmt = $this->conn->prepare($query);

            // execute query
            $stmt->execute();
            return "success";
        } catch (\PDOException $e) {
            return false;
            exit($e->getMessage());
        }
    }
}

?>