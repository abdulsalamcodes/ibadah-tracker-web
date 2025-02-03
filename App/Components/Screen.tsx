import React, { ReactNode } from "react";
import Constants from "expo-constants";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  useColorScheme,
} from "react-native";
import { StatusBar } from "expo-status-bar";

type screenProp = {
  children: ReactNode;
  style?: object | undefined;
};

function Screen({ children, style }: screenProp) {
  const scheme = useColorScheme();

  return (
    <View
      style={[styles.screen, style]}
      className="bg-white p-5 dark:bg-[#090710] "
    >
      <StatusBar
        style="auto"
        backgroundColor={scheme === "dark" ? "#1b202a" : "#fff"}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
  view: {
    flex: 1,
  },
});

export default Screen;
