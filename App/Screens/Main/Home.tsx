import { Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Screen from "../../Components/Screen";
import { Ionicons } from "@expo/vector-icons";
import IbadahList from "../../Components/Main/TabView";
import { useNavigation } from "@react-navigation/native";
import { Route } from "../../Navigation/RoutePath";
import { useAuth } from "../../Provider/AuthPr";
import { Progress } from "../../Components/Main/Progress";
const Home = () => {
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();

  const navigation = useNavigation();

  return (
    <Screen>
      <View className="flex-row items-center  justify-between   p-2 ">
        <Ionicons name="calendar-outline" size={30} />
        <TouchableOpacity
          className="   flex-row items-center bg-[#4ade80]  px-5  py-2 rounded-lg"
          //@ts-ignore
          onPress={() => navigation.navigate(Route.AddIbadah)}
        >
          <Ionicons name="add" size={20} color={"#fff"} />
          <Text className="text-base  font-popRegular text-white ">
            Add Ibadah
          </Text>
        </TouchableOpacity>
      </View>

      <IbadahList />
    </Screen>
  );
};

export default Home;
