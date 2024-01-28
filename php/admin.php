<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

file_put_contents("debug.txt", file_get_contents("php://input"));

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "hostel_management_system";

try {
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }

    // Replace 'admin' and 'admin' with the actual username and password values
    $adminUsername = 'admin';
    $adminPassword = 'admin';

    // Hash the password before inserting it into the database
    $hashedPassword = password_hash($adminPassword, PASSWORD_DEFAULT);

    $sqlInsert = "INSERT INTO admin (admin, password) VALUES (?, ?)";
    $stmtInsert = $conn->prepare($sqlInsert);
    $stmtInsert->bind_param("ss", $adminUsername, $hashedPassword);
    $stmtInsert->execute();

    if ($stmtInsert->error) {
        file_put_contents("debug.txt", "SQL Error: " . $stmtInsert->error . "\n", FILE_APPEND);
        throw new Exception("SQL Error: " . $stmtInsert->error);
    }

    echo json_encode(["success" => true, "message" => "Admin record created successfully"]);

    $stmtInsert->close();
    $conn->close();
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
}
?>
