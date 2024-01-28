<?php
// Database configuration
$host = 'localhost'; // Host name
$username = 'root'; // MySQL username
$password = ''; // MySQL password
$dbname = 'hostel_management_system'; // Database name

// Create connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the JSON POST body and decode it into an associative array
$input = json_decode(file_get_contents('php://input'), true);

// Extract the student name from the decoded JSON
$studentName = isset($input['studentName']) ? $input['studentName'] : '';

if ($studentName != '') {
    // Prepare a statement to select the student
    $stmt = $conn->prepare("SELECT * FROM studentDetails WHERE studentName = ?");
    $stmt->bind_param("s", $studentName);

    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $studentDetails = array();

        while ($row = $result->fetch_assoc()) {
            // Assuming roommates are stored as a JSON string, decode it
            $row['roommates'] = json_decode($row['roommates']);
            $studentDetails[] = $row;
        }

        echo json_encode($studentDetails);
    } else {
        echo json_encode(array('error' => 'Student not found'));
    }

    $stmt->close();
} else {
    echo json_encode(array('error' => 'Student name is required'));
}

$conn->close();
?>
