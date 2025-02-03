import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Route } from "./RoutePath";
import Welcome from "../Screens/Auth/Welcome";
import SignIn from "../Screens/Auth/SignIn";
import SignUp from "../Screens/Auth/SignUp";

export type AuthStackParamList = {
  welcome: undefined;
  signUp: undefined;
  login: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();
export const AuthNav = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Route.Welcome} component={Welcome} />
      <Stack.Screen name={Route.Login} component={SignIn} />
      <Stack.Screen name={Route.SignUp} component={SignUp} />
    </Stack.Navigator>
  );
};
