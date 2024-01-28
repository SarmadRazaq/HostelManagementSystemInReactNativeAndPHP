// AdminDashboard.js
import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { Card, Title, Button } from "react-native-paper";

const AdminDashboard = ({ navigation }) => {
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    fetchStudentList();
  }, []);

  const fetchStudentList = async () => {
    try {
      const response = await fetch(
        "http://192.168.18.168/fetchStudentList.php"
      );
      const result = await response.json();

      if (result.success) {
        setStudentList(result.data);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error fetching student list:", error);
      alert("Failed to fetch student list.");
    }
  };

  const navigateToEditScreen = (studentName) => {
    navigation.navigate("EditStudentDetails", { studentName });
  };

  const navigateToAddStudentScreen = () => {
    navigation.navigate("AddStudentScreen");
  };

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>Admin Dashboard</Title>
      <Button
        mode="contained"
        onPress={navigateToAddStudentScreen}
        style={styles.addButton}
      >
        Add New Student
      </Button>
      {studentList.map((student) => (
        <Card key={student.studentName} style={styles.card}>
          <Card.Content>
            <Text style={styles.studentName}>{student.studentName}</Text>
            <Text>Father Name: {student.fatherName}</Text>
            <Text>Registration Number: {student.registrationNumber}</Text>
            <Text>Fee Status: {student.feeStatus}</Text>
            <Text>Room Number: {student.roomNumber}</Text>
            <Button
              mode="contained"
              onPress={() => navigateToEditScreen(student.studentName)}
              style={styles.editButton}
            >
              Edit
            </Button>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    marginVertical: 10,
  },
  studentName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  editButton: {
    marginTop: 10,
    borderRadius: 50,
  },
  addButton: {
    marginTop: 20,
    borderRadius: 50,
  },
});

export default AdminDashboard;
