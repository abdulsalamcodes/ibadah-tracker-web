//@ts-nocheck
import { Text, View } from "react-native";

type ErrorType = {
  error: string;
  visible: boolean;
};

export default function ErrorMessage({ error, visible }: ErrorType) {
  if (!visible || !error) return null;
  return (
    <View>
      <Text className="pb-1 pl-2 pt-1 font-popRegular text-sm text-red-400">
        {error}
      </Text>
    </View>
  );
}
