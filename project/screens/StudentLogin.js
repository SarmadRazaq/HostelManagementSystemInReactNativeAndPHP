import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { TextInput, Button, Card, Title } from "react-native-paper";

const StudentLogin = ({ navigation }) => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "http://192.168.18.168/studentLogin.php", // Replace with your server URL
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      const result = await response.json();
      if (result.success) {
        // Successful login
        // Pass the username to StudentDashboard screen
        navigation.navigate("StudentDashboard", {
          studentName: loginData.username,
        });
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to login");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Student Login</Title>
          <TextInput
            label="Username"
            value={loginData.username}
            onChangeText={(text) =>
              setLoginData({ ...loginData, username: text })
            }
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Password"
            value={loginData.password}
            onChangeText={(text) =>
              setLoginData({ ...loginData, password: text })
            }
            style={styles.input}
            mode="outlined"
            secureTextEntry={true}
          />
          <Button mode="contained" onPress={handleLogin} style={styles.button}>
            Login
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

export default StudentLogin;
