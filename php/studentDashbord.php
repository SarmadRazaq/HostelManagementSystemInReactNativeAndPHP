<?php
// Database configuration
$host = 'localhost';
$username = 'root';
$password = '';
$dbname = 'hostel_management_system';

// Create connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the JSON POST body and decode it into an associative array
$input = json_decode(file_get_contents('php://input'), true);

// Log received data for debugging
file_put_contents("debug.txt", "Received data in PHP: " . json_encode($input) . "\n", FILE_APPEND);

// Extract username from the decoded JSON
$username = isset($input['username']) ? trim($input['username']) : '';

// Check if required fields are provided
if (!empty($username)) {
    // Prepare a statement to retrieve student details
    $stmt = $conn->prepare("SELECT * FROM studentdetails WHERE studentName = ?");
    $stmt->bind_param("s", $username);

    $stmt->execute();
    $result = $stmt->get_result();

    // Debugging: Log SQL query and received data
    file_put_contents("debug.txt", "SQL Query: " . $stmt->sqlstate . "\n", FILE_APPEND);
    file_put_contents("debug.txt", "Received data: " . json_encode($input) . "\n", FILE_APPEND);

    if ($result->num_rows > 0) {
        // Fetch student details as an associative array
        $row = $result->fetch_assoc();
        echo json_encode(['success' => true, 'data' => $row]);
    } else {
        echo json_encode(['success' => false, 'message' => 'No student details available']);
    }

    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Username is missing or empty']);
}

$conn->close();
?>
