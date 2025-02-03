import React, { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
// import Colors from "../config/Colors";

type ButtonProps = {
  title: string;
  btnStyle?: object | undefined;
  handlePress?: () => void;
  icon?: ReactNode;
  textStyle?: object | undefined;
};

function AppButton({
  title,
  handlePress,
  btnStyle,
  icon,
  textStyle,
}: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={{ ...styles.buttonContainer, ...btnStyle }}
      onPress={handlePress}
    >
      {icon ? icon : null}
      <Text style={{ ...styles.text, ...textStyle }}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    height: 54,
    borderRadius: 55,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 6,
    backgroundColor: "#4ade80",
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Poppins-bold",
    // fontWeight: "bold",
  },
});
export default AppButton;
