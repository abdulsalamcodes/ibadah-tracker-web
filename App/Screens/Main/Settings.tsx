import React, { useState } from "react";
import { View, Text, Switch, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Screen from "../../Components/Screen";

const SettingsPage: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  return (
    <Screen style={{ backgroundColor: "#f3f4f6" }}>
      <ScrollView className="flex-1  bg-gray-100">
        <View className="bg-white rounded-lg shadow-md mb-4 p-4">
          <Text className="text-xl font-bold mb-4 text-gray-800">
            Notifications
          </Text>
          <View className="flex-row justify-between items-center">
            <Text className="text-gray-600">Enable Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
            />
          </View>
        </View>

        <View className="bg-white rounded-lg shadow-md mb-4 p-4">
          <Text className="text-xl font-bold mb-4 text-gray-800">
            Appearance
          </Text>
          <View className="flex-row justify-between items-center">
            <Text className="text-gray-600">Dark Mode</Text>
            <Switch value={darkMode} onValueChange={setDarkMode} />
          </View>
        </View>

        <View className="bg-white rounded-lg shadow-md mb-4 p-4">
          <Text className="text-xl font-bold mb-4 text-gray-800">Language</Text>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
          >
            <Picker.Item label="English" value="en" />
            <Picker.Item label="العربية" value="es" />
            <Picker.Item label="French" value="fr" />
            <Picker.Item label="German" value="de" />
          </Picker>
        </View>

        <View className="bg-white rounded-lg shadow-md mb-4 p-4">
          <Text className="text-xl font-bold mb-4 text-gray-800">Support</Text>
          <View>
            <Text className="text-gray-600 py-2">Contact Support</Text>
            <Text className="text-gray-600 py-2">FAQ</Text>
            <Text className="text-gray-600 py-2">Help Center</Text>
          </View>
        </View>

        <View className="bg-white rounded-lg shadow-md p-4">
          <Text className="text-xl font-bold mb-4 text-gray-800">
            Data Management
          </Text>
          <View>
            <Text className="text-gray-600 py-2">Clear Cache</Text>
            <Text className="text-gray-600 py-2">Export Data</Text>
            <Text className="text-red-600 py-2">Delete Account</Text>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default SettingsPage;
