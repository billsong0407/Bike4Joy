<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type, Authorization");
$postdata = file_get_contents("php://input");

$servername = "bike4joy-database.cvcxjrsjyuuy.us-east-2.rds.amazonaws.com";
$username = "admin";
$sqlpassword = "bike4joy123";

$request = json_decode($postdata);

$email = $request->email;
$password = $request->password;
$name = $request->name;

try {
  $pdo = new PDO("mysql:host=$servername;dbname=bike4joy", $username, $sqlpassword);
  // set the PDO error mode to exception
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  echo "Connected successfully";

  //The email we are looking for.
  $emailToLookFor = $email;

  //The SQL query.
  $query = "SELECT COUNT(*) AS num FROM USERS WHERE email = :email";

  //Prepare the SQL statement.
  $stmt = $pdo->prepare($query);

  //Bind our email value to the :email parameter.
  $stmt->bindValue(':email', $emailToLookFor);

  //Execute the statement.
  $stmt->execute();

  //Fetch the row / result.
  $row = $stmt->fetch(PDO::FETCH_ASSOC);

  //If num is bigger than 0, the email already exists.
  if($row['num'] > 0){
   echo 'Row exists!';

   //Find id corresponding to existing user
   $emailToLookFor2 = $email;
   $userid = "SELECT id FROM USERS WHERE email = :emailcheck";
   $stmt2 = $pdo->prepare($userid);
   $stmt2->bindValue(':emailcheck', $emailToLookFor2);
   $stmt2->execute();
   $realUserId = $stmt2->fetch(PDO::FETCH_ASSOC)["id"];
   echo $realUserId; //<---Returned userid

  } else{//Else the email doesnt exist.
    echo 'Row does not exist!';
    $sql = "INSERT INTO USERS VALUES(0, '$name', '$email','$password')";
    // use exec() because no results are returned
    $pdo->exec($sql);
    echo " New record created successfully";
   //Find id corresponding to existing user
   $emailToLookFor2 = $email;
   $userid = "SELECT id FROM USERS WHERE email = :emailcheck";
   $stmt2 = $pdo->prepare($userid);
   $stmt2->bindValue(':emailcheck', $emailToLookFor2);
   $stmt2->execute();
   $realUserId = $stmt2->fetch(PDO::FETCH_ASSOC)["id"];
   echo $realUserId; //<---Returned userid
  } 




} catch(PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}
?>
