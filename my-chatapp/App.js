// App.js
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ChatApp from "./src/ChatApp";
import ConnectionFriends from "./src/ConnectionFriends";
import LoginPage from "./src/LoginPage";
import SignInPage from "./src/SignInPage";
import ChatHome from "./src/ChatHome";

const Stack = createNativeStackNavigator();

// Splash screen component: shows ChatApp and after 3s navigates to ConnectionFriends
function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      // use replace so back button doesn't return to Splash
      navigation.replace("ConnectionFriends");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  // render your ChatApp component as splash content
  return <ChatApp />;
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false, // hide header for full-screen look
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="ConnectionFriends" component={ConnectionFriends} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="SignIn" component={SignInPage} />
        <Stack.Screen name="ActualHome" component={ChatHome} />
        {/* Add other screens here, e.g. SignIn, Login, Home, etc. */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
