import React from "react";
import { View, Text, Animated, StyleSheet } from "react-native";

interface ProgressProps {
  value: number; // Value should be a number between 0 and 100
  className?: string; // You can pass className for additional styling if needed
}

const Progress: React.FC<ProgressProps> = ({ value, className }) => {
  // Animated value to handle the smooth transition
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  // Animate progress when value changes
  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value,
      duration: 500, // Adjust the duration for the animation
      useNativeDriver: false,
    }).start();
  }, [value]);

  const progressWidth = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={[styles.container]}>
      <Animated.View
        style={[
          styles.indicator,
          { width: progressWidth }, // Animated width based on value
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 8, // Height of the progress bar
    width: "100%", // Full width of the container
    backgroundColor: "rgba(0, 123, 255, 0.2)", // Light background color
    borderRadius: 10, // Rounded corners
  },
  indicator: {
    height: "100%", // Fill the height of the container
    backgroundColor: "#4ade80", // Change to your desired color
    borderRadius: 10, // Rounded corners
  },
});

export { Progress };
