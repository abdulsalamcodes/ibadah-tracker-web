import { View, Text, TouchableOpacity, Animated } from "react-native";
import React, { useRef } from "react";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

interface IbadahTaskProps {
  ibadah: {
    _id: string;
    name: string;
    description: string;
    time: string;
    frequency: "daily" | "weekly";
    completionStatus?: any[];
  };
  handleDone: (id: string) => void;
}

const IbadahTask: React.FC<IbadahTaskProps> = ({ ibadah, handleDone }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    handleDone(ibadah._id);
  };

  const isCompleted = ibadah?.completionStatus?.some(
    (status) =>
      new Date(status.date).toDateString() === new Date().toDateString() &&
      status.completed
  );

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }],
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}
      className={`
        rounded-2xl 
        ${isCompleted ? "bg-emerald-50" : "bg-white"} 
        px-4 py-4 mb-3 flex-row items-center
      `}
    >
      <TouchableOpacity
        className="flex-row items-center flex-1"
        activeOpacity={0.7}
        onPress={handlePress}
      >
        <View
          className={`
          w-8 h-8 rounded-full items-center justify-center
          ${isCompleted ? "bg-emerald-100" : "bg-gray-100"}
        `}
        >
          <MaterialIcons
            name={isCompleted ? "check" : "assignment-turned-in"}
            size={20}
            color={isCompleted ? "#10b981" : "#6b7280"}
          />
        </View>

        <View className="ml-4 flex-1">
          <View className="flex-row items-center">
            <Text
              className={`
              font-popSemiBold text-lg 
              ${isCompleted ? "text-emerald-800 line-through" : "text-gray-800"}
            `}
            >
              {ibadah?.name}
            </Text>
            {ibadah.frequency === "weekly" && (
              <Ionicons
                name="repeat"
                size={16}
                className="ml-2 text-gray-500"
              />
            )}
          </View>
          <Text
            className={`
            font-popLight text-sm 
            ${isCompleted ? "text-emerald-600" : "text-gray-500"}
          `}
          >
            {ibadah?.description}
          </Text>
        </View>
      </TouchableOpacity>

      <View
        className={`
        rounded-xl px-3 py-1
        ${isCompleted ? "bg-emerald-100" : "bg-gray-100"}
      `}
      >
        <Text
          className={`
          font-popMedium 
          ${isCompleted ? "text-emerald-800" : "text-gray-700"}
        `}
        >
          {ibadah?.time}
        </Text>
      </View>
    </Animated.View>
  );
};

export default IbadahTask;
