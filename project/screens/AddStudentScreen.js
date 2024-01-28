// AddStudentScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";

const AddStudentScreen = () => {
  const [studentName, setStudentName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [password, setPassword] = useState("");
  const [feeStatus, setFeeStatus] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [roommates, setRoommates] = useState("");

  const handleAddStudent = async () => {
    try {
      const response = await fetch("http://192.168.18.168/addStudent.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentName,
          fatherName,
          registrationNumber,
          password,
          feeStatus,
          roomNumber,
          roommates,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        console.log(result.message);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Student</Text>
      <TextInput
        style={styles.input}
        placeholder="Student Name"
        value={studentName}
        onChangeText={(text) => setStudentName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Father Name"
        value={fatherName}
        onChangeText={(text) => setFatherName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Registration Number"
        value={registrationNumber}
        onChangeText={(text) => setRegistrationNumber(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Fee Status"
        value={feeStatus}
        onChangeText={(text) => setFeeStatus(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Room Number"
        value={roomNumber}
        onChangeText={(text) => setRoomNumber(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Roommates"
        value={roommates}
        onChangeText={(text) => setRoommates(text)}
      />
      <Button title="Add Student" onPress={handleAddStudent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default AddStudentScreen;
