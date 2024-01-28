<?php

// Enable error reporting for debugging (disable in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Start output buffering to prevent early output
ob_start();

// Set response headers for JSON output
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Handle CORS if necessary

// Database configuration
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "hostel_management_system";

// Create database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check database connection
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]);
    ob_end_flush(); // Send output buffer and turn off buffering
    exit;
}

// Decode JSON from the request body
$data = json_decode(file_get_contents("php://input"), true);

// Validate JSON data
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(["success" => false, "message" => "Invalid JSON data received"]);
    ob_end_flush();
    exit;
}

// Extract and sanitize input data
$username = isset($data['username']) ? $conn->real_escape_string($data['username']) : null;
$password = isset($data['password']) ? $conn->real_escape_string($data['password']) : null;
$email = isset($data['email']) ? $conn->real_escape_string($data['email']) : null;
$phone = isset($data['phone']) ? $conn->real_escape_string($data['phone']) : null;

// Check if any required field is missing
if (!$username || !$password || !$email || !$phone) {
    echo json_encode(["success" => false, "message" => "Missing required data"]);
    ob_end_flush();
    exit;
}

// Check if the student already exists
$sqlSelect = "SELECT * FROM students WHERE username = ? OR email = ?";
$stmtSelect = $conn->prepare($sqlSelect);
$stmtSelect->bind_param("ss", $username, $email);
$stmtSelect->execute();
$stmtSelect->store_result();

if ($stmtSelect->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Student with the same username or email already exists"]);
    $stmtSelect->close();
    ob_end_flush();
    exit;
}
$stmtSelect->close();

// Hash the password
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Insert new student record
$sqlInsert = "INSERT INTO students (username, password, email, phone) VALUES (?, ?, ?, ?)";
$stmtInsert = $conn->prepare($sqlInsert);
$stmtInsert->bind_param("ssss", $username, $hashed_password, $email, $phone);

if ($stmtInsert->execute()) {
    echo json_encode(["success" => true, "message" => "New student record created successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Error creating student record: " . $stmtInsert->error]);
}
$stmtInsert->close();

// Close database connection
$conn->close();

// Send output buffer and turn off output buffering
ob_end_flush();
?>
