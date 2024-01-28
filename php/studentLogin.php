<?php

// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Log raw data
file_put_contents("debug.txt", file_get_contents("php://input"));

// Set response headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Handle CORS, if needed

// Database configuration
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "hostel_management_system"; // Adjusted database name without spaces

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]);
    exit;
}

// Decode JSON from the request body
$data = json_decode(file_get_contents("php://input"), true); // Decoding to an associative array

// Check if JSON decoding was successful
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(["success" => false, "message" => "Invalid JSON data received"]);
    exit;
}

// Extract and sanitize input data
$username = isset($data['username']) ? $conn->real_escape_string($data['username']) : null;
$password = isset($data['password']) ? $conn->real_escape_string($data['password']) : null;

// Check if any required field is null
if ($username === null || $password === null) {
    echo json_encode(["success" => false, "message" => "Missing required data"]);
    exit;
}

// SQL to retrieve student with the given username
$sqlSelect = "SELECT * FROM students WHERE username = ?";
$stmtSelect = $conn->prepare($sqlSelect);
$stmtSelect->bind_param("s", $username);
$stmtSelect->execute();
$result = $stmtSelect->get_result();

// Check if a matching record is found
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    
    // Verify password
    if (password_verify($password, $row['password'])) {
        echo json_encode(["success" => true, "message" => "Login successful"]);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid password"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Student not found"]);
}

// Close statements and connection
$stmtSelect->close();
$conn->close();
?>
