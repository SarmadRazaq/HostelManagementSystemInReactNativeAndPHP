// EditStudentDetails.js
import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { TextInput, Button, Card, Title } from "react-native-paper";

const EditStudentDetails = ({ route, navigation }) => {
  const { studentName } = route.params;
  const [editedStudent, setEditedStudent] = useState({
    studentName,
    fatherName: "",
    password: "",
    registrationNumber: "",
    feeStatus: "",
    roomNumber: "",
  });

  useEffect(() => {
    fetchStudentDetails();
  }, []);

  const fetchStudentDetails = async () => {
    try {
      const response = await fetch(
        "http://192.168.18.168/fetchStudentDetails.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ studentName }),
        }
      );

      const result = await response.json();
      if (result.success) {
        setEditedStudent(result.data);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error fetching student details:", error);
      alert("Failed to fetch student details.");
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        "http://192.168.18.168/editStudentDetails.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedStudent),
        }
      );

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error("Error updating student details:", error);
      alert("Failed to update student details.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Edit Student Details</Title>
          <Text>Student Name: {editedStudent.studentName}</Text>
          <TextInput
            label="Father Name"
            value={editedStudent.fatherName}
            onChangeText={(text) =>
              setEditedStudent({ ...editedStudent, fatherName: text })
            }
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Password"
            value={editedStudent.password}
            onChangeText={(text) =>
              setEditedStudent({ ...editedStudent, password: text })
            }
            style={styles.input}
            mode="outlined"
            secureTextEntry={true}
          />
          {/* Add more input fields for other details */}
          <TextInput
            label="Registration Number"
            value={editedStudent.registrationNumber}
            onChangeText={(text) =>
              setEditedStudent({ ...editedStudent, registrationNumber: text })
            }
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Fee Status"
            value={editedStudent.feeStatus}
            onChangeText={(text) =>
              setEditedStudent({ ...editedStudent, feeStatus: text })
            }
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Room Number"
            value={editedStudent.roomNumber}
            onChangeText={(text) =>
              setEditedStudent({ ...editedStudent, roomNumber: text })
            }
            style={styles.input}
            mode="outlined"
          />
          <Button mode="contained" onPress={handleSave} style={styles.button}>
            Save
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  card: {
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    marginBottom: 10,
    borderRadius: 50,
  },
  button: {
    marginTop: 20,
    borderRadius: 50,
  },
});

export default EditStudentDetails;
