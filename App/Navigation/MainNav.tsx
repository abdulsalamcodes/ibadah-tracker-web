import React from "react";
import { Route } from "./RoutePath";
import Activity from "../Screens/Main/Activity";
import Settings from "../Screens/Main/Settings";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Feather } from "@expo/vector-icons";
import { HomeNav } from "./HomeNav";
export type AuthStackParamList = {
  homeNav: undefined;
  stat: undefined;
  settings: undefined;
};

const Stack = createBottomTabNavigator<AuthStackParamList>();
export const MainNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, tabBarActiveTintColor: "#4ade80" }}
    >
      <Stack.Screen
        name={Route.HomeNav}
        component={HomeNav}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Stack.Screen
        name={Route.Stat}
        component={Activity}
        options={{
          tabBarLabel: "Activity",
          tabBarIcon: ({ color, size }) => (
            <Feather name="bar-chart-2" color={color} size={size} />
          ),
        }}
      />
      <Stack.Screen
        name={Route.Settings}
        component={Settings}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};
