import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const StudentDashboard = ({ route }) => {
  const { studentName } = route.params;
  const [studentDetails, setStudentDetails] = useState(null);

  useEffect(() => {
    fetchStudentDetails();
  }, []);

  const fetchStudentDetails = async () => {
    try {
      const response = await fetch("http://192.168.18.168/studentSignup.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentName: studentName }),
      });

      const result = await response.json();
      if (result.success) {
        setStudentDetails(result.data);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to fetch student details.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {studentDetails ? (
        <View style={styles.detailsContainer}>
          {Object.entries(studentDetails).map(([key, value]) => (
            <View key={key} style={styles.detailContainer}>
              <Text style={styles.detailKey}>{key}</Text>
              <Text style={styles.detailValue}>{value.toString()}</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.noDetailsText}>No student details available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  detailsContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    elevation: 3,
  },
  detailContainer: {
    marginBottom: 10,
  },
  detailKey: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333333",
  },
  detailValue: {
    marginTop: 5,
    fontSize: 14,
    color: "#555555",
  },
  noDetailsText: {
    fontSize: 18,
    color: "#666666",
    textAlign: "center",
    marginTop: 20,
  },
});

export default StudentDashboard;
