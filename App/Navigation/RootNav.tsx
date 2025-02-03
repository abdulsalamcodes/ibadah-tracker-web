import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthNav } from "./AuthNav";
import { useAuth } from "../Provider/AuthPr";
import { MainNav } from "./MainNav";

const RootNav = () => {
  const { user, loading } = useAuth();

  return (
    <NavigationContainer key={user ? "loggedIn" : "loggedOut"}>
      {user ? <MainNav /> : <AuthNav />}
    </NavigationContainer>
  );
};

export default RootNav;
