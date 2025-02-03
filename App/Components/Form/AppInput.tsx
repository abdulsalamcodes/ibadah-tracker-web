import React, { ReactNode } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TextInputProps,
  useColorScheme,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface inputProps extends TextInputProps {
  bgstyle?: object;
  otherProps?: object;
  children?: ReactNode;
}

export default function AppInput({
  bgstyle,
  children,
  ...otherProps
}: inputProps) {
  const theme = useColorScheme();
  return (
    <>
      <View
        style={{ ...bgstyle }}
        className="min-h-[53px] w-full justify-center rounded-[8px]  border-1 border-red-600 bg-gray-100   bg-opacity-40 dark:bg-[#1b202a] "
      >
        <TextInput
          {...otherProps}
          className="font-popSemiBold items-center pl-6 text-left text-lg text-black dark:text-white"
          placeholderTextColor={theme === "dark" ? "#808191" : "#000"}
        />
        {children}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginTop: 4,
  },
});
