import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import {
  Title,
  TextInput as PaperTextInput,
  Button as PaperButton,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const AdminLogin = () => {
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.18.168/admin.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminUsername: adminUsername,
          adminPassword: adminPassword,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Admin login successful
        Alert.alert("Success", "Admin login successful");
        // Navigate to the AdminDashboard screen
        navigation.navigate("AdminDashboard");
      } else {
        // Admin login failed
        Alert.alert("Error", `Admin login failed. ${result.message}`);
      }
    } catch (error) {
      console.error("Error during admin login:", error);
      // Handle the error, e.g., show an error message
      Alert.alert(
        "Error",
        "An error occurred during admin login. Please try again."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Admin Login</Title>
      <PaperTextInput
        label="Username or Email"
        value={adminUsername}
        onChangeText={(text) => setAdminUsername(text)}
        style={styles.input}
      />
      <PaperTextInput
        label="Password"
        secureTextEntry
        value={adminPassword}
        onChangeText={(text) => setAdminPassword(text)}
        style={styles.input}
      />
      <PaperButton mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </PaperButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    borderRadius: 50,
  },
});

export default AdminLogin;
