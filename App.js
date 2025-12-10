import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashContent from "./src/screens/SplashContent";
import ConnectionFriends from "./src/screens/ConnectionFriends";
import LoginPage from "./src/screens/LoginPage";
import SignUpScreen from "./src/screens/SignUpScreen";
import ChatHome from "./src/screens/ChatHome";
import ChatFriend from "./src/screens/ChatFriend";
import GroupFriendsChat from "./src/screens/GroupFriendsChat";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./src/screens/ResetPasswordScreen";
import OtpVerificationScreen from "./src/screens/OtpVerificationScreen";
import { AuthProvider, useAuth } from "./src/context/AuthContext";

const Stack = createNativeStackNavigator();

function SplashScreen({ navigation }) {
  const { hydrated, user } = useAuth();

  useEffect(() => {
    if (!hydrated) return;
    const timer = setTimeout(() => {
      navigation.replace(user ? "ActualHome" : "ConnectionFriends");
    }, 1500);
    return () => clearTimeout(timer);
  }, [hydrated, navigation, user]);

  if (!hydrated) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "black" }}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return <SplashContent />;
}

function RootNavigator() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="ConnectionFriends" component={ConnectionFriends} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="VerifyOtp" component={OtpVerificationScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="ActualHome" component={ChatHome} />
        <Stack.Screen name="ChatFriend" component={ChatFriend} />
        <Stack.Screen name="GroupFriendsChat" component={GroupFriendsChat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
