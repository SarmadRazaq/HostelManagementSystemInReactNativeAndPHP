// Install the required dependencies:
// npm install @react-navigation/native @react-navigation/stack react-native-paper

import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StudentLogin from "./screens/StudentLogin";
import AdminLogin from "./screens/AdminLogin";
import StudentDashboard from "./screens/StudentDashboard";
import AdminDashboard from "./screens/AdminDashboard";
import EditStudentDetails from "./screens/EditStudentDetails";
import AddStudentScreen from "./screens/AddStudentScreen";

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to Hostel Management System</Text>

      <Button
        style={styles.button}
        mode="contained"
        onPress={() => navigation.navigate("StudentLogin")}
      >
        Student Login
      </Button>

      <Button
        style={styles.button}
        mode="contained"
        onPress={() => navigation.navigate("AdminLogin")}
      >
        Admin Login
      </Button>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="StudentLogin" component={StudentLogin} />
        <Stack.Screen name="AdminLogin" component={AdminLogin} />
        <Stack.Screen name="StudentDashboard" component={StudentDashboard} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen
          name="EditStudentDetails"
          component={EditStudentDetails}
        />
        <Stack.Screen name="AddStudentScreen" component={AddStudentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  heading: {
    fontSize: 20,
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    width: "100%",
    borderRadius: 50,
  },
});

export default App;
