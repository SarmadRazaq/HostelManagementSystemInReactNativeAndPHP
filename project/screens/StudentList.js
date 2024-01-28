// Inside StudentList.js
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const StudentList = () => {
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    // Fetch student list from the backend
    fetchStudentList();
  }, []);

  const fetchStudentList = async () => {
    try {
      const response = await fetch(
        "http://192.168.18.168/fetchStudentList.php", // Replace with your API endpoint
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
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

  return (
    <ScrollView style={styles.container}>
      {studentList.map((student) => (
        <View key={student.studentName} style={styles.detailContainer}>
          <Text style={styles.detailKey}>Student Name</Text>
          <Text style={styles.detailValue}>{student.studentName}</Text>
          {/* Include other student details as needed */}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  detailContainer: {
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  detailKey: {
    fontWeight: "bold",
  },
  detailValue: {
    marginTop: 5,
  },
});

export default StudentList;
