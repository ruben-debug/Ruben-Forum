<?php
// Get the name and message from the POST variables
$name = $_POST['name'];
$message = $_POST['message'];

// Connect to the database
$dbhost = 'localhost';
$dbuser = 'username';
$dbpass = 'password';
$dbname = 'database_name';
$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

// Check for errors
if (!$conn) {
  die('Could not connect to database: ' . mysqli_error($conn));
}

// Save the message to the database
$sql = "INSERT INTO messages (name, message) VALUES ('$name', '$message')";
$result = mysqli_query($conn, $sql);

// Check for errors
if (!$result) {
  die('Could not save message to database: ' . mysqli_error($conn));
}

// Close the database connection
mysqli_close($conn);

echo 'Message saved to database.';
?>
