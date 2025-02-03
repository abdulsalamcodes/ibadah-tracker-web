import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Route } from "./RoutePath";
import Home from "../Screens/Main/Home";
// import AddIbadah from "../Screens/Main/AddIbadah";
import TaskScheduler from "../Screens/Main/AddIbadah";

export type AuthStackParamList = {
  homeScreen: undefined;
  addIbadah: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();
export const HomeNav = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Route.HomeScreen} component={Home} />
      <Stack.Screen name={Route.AddIbadah} component={TaskScheduler} />
    </Stack.Navigator>
  );
};
