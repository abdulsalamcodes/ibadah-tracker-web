import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Picker } from "@react-native-picker/picker";
import Checkbox from "expo-checkbox";
import Screen from "../../Components/Screen";
import AppButton from "../../Components/AppButton";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface FormValues {
  name: string;
  frequency: "daily" | "weekly";
  description: string;
  time: Date;
  days: string[];
}

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const TaskScheduler = () => {
  const [loading, setLoading] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const navigation = useNavigation();

  const submitForm = async (values: {
    name: string;
    frequency: "daily" | "weekly";
    time: Date;
    days: string[];
  }) => {
    const { days, ...newData } = {
      ...values,
      time: values.time.toTimeString().slice(0, 5),
    };

    const token = await AsyncStorage.getItem("token");
    if (!token) {
      Alert.alert("Error", "Authentication token missing. Please login again.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        "https://ibadah-tracker-be.vercel.app/api/ibadah",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newData),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to create Ibadah");
      }

      Alert.alert("Success", "Ibadah created successfully!");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <View className="items-center justify-between p-4 flex-row">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="return-up-back-sharp" size={25} />
        </TouchableOpacity>
        <Text className="text-lg font-popSemiBold capitalize ">
          Create an Ibadah
        </Text>
        <View />
      </View>
      <Formik<FormValues>
        initialValues={{
          name: "",
          description: "",
          frequency: "daily",
          time: new Date(),
          days: [],
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Ibadah requires a name"),
          description: Yup.string().required("Ibadah requires a description"),
          frequency: Yup.string()
            .oneOf(["daily", "weekly"])
            .required("Required"),
          time: Yup.date().required("Time is required"),
          days: Yup.array().when("frequency", {
            is: "weekly",
            then: (schema) => schema.min(1, "Select at least one day"),
          }),
        })}
        onSubmit={(
          values: FormValues,
          { resetForm }: FormikHelpers<FormValues>
        ) => {
          submitForm(values);
          resetForm();
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue,
          errors,
          touched,
        }) => (
          <>
            <View className="flex-1">
              <Text className="text-base font-popRegular">Ibadah Name:</Text>
              <View className="min-h-[53px] w-full justify-center rounded-[8px] border-1 border-red-600 bg-gray-100 bg-opacity-40 dark:bg-[#1b202a]">
                <TextInput
                  className="font-popRegular items-center pl-6 text-left text-base text-black dark:text-white"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                  placeholder="E.g Quran Revision"
                />
              </View>
              {touched.name && errors.name && (
                <Text style={{ color: "red" }}>{errors.name}</Text>
              )}

              <View className="py-3">
                <Text className="text-base font-popRegular">
                  Ibadah Description:
                </Text>
                <View className="min-h-[53px] w-full justify-center rounded-[8px] border-1 border-red-600 bg-gray-100 bg-opacity-40 dark:bg-[#1b202a]">
                  <TextInput
                    className="font-popRegular items-center pl-6 text-left text-base text-black dark:text-white"
                    onChangeText={handleChange("description")}
                    onBlur={handleBlur("description")}
                    value={values.description}
                    placeholder="E.g Revise quran for 15 minutes"
                  />
                </View>
                {touched.description && errors.description && (
                  <Text style={{ color: "red" }}>{errors.description}</Text>
                )}
              </View>

              <Text className="text-base font-popRegular z-50">Frequency:</Text>
              <View
                style={{
                  paddingTop: Platform.OS === "ios" ? 15 : 0,
                  overflow: "hidden",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Picker
                  selectedValue={values.frequency}
                  onValueChange={(itemValue) =>
                    setFieldValue("frequency", itemValue)
                  }
                  style={{
                    height: 50,
                    width: "100%",
                  }}
                  itemStyle={{
                    height: 50,
                  }}
                >
                  <Picker.Item label="Daily" value="daily" />
                  <Picker.Item label="Weekly" value="weekly" />
                </Picker>
              </View>

              {(values.frequency === "daily" ||
                values.frequency === "weekly") && (
                <View>
                  <Text className="text-base font-popRegular z-50">Time:</Text>
                  <TouchableOpacity
                    onPress={() => setShowTimePicker(true)}
                    className="min-h-[53px] w-full justify-center rounded-[8px] bg-gray-100 bg-opacity-40 dark:bg-[#1b202a]"
                  >
                    <Text className="font-popRegular pl-6 text-base text-black dark:text-white">
                      {values.time.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  </TouchableOpacity>

                  {showTimePicker && (
                    <DateTimePicker
                      value={values.time}
                      mode="time"
                      is24Hour={true}
                      onChange={(event, selectedTime) => {
                        setShowTimePicker(false);
                        if (selectedTime) {
                          setFieldValue("time", selectedTime);
                        }
                      }}
                    />
                  )}
                </View>
              )}

              {values.frequency === "weekly" && (
                <View>
                  <Text className="text-base font-popRegular py-3">
                    Select Days:
                  </Text>
                  <View className="grid grid-cols-2 gap-4 flex-row flex-wrap items-center justify-between">
                    {daysOfWeek.map((day) => (
                      <View
                        key={day}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Checkbox
                          value={values.days.includes(day)}
                          onValueChange={(newValue) => {
                            if (newValue) {
                              setFieldValue("days", [...values.days, day]);
                            } else {
                              setFieldValue(
                                "days",
                                values.days.filter((d) => d !== day)
                              );
                            }
                          }}
                        />
                        <Text className="text-base font-popRegular px-1">
                          {day}
                        </Text>
                      </View>
                    ))}
                  </View>
                  {touched.days && errors.days && (
                    <Text style={{ color: "red" }}>{errors.days}</Text>
                  )}
                </View>
              )}
            </View>

            {loading ? (
              <ActivityIndicator color="#910a51" size="large" />
            ) : (
              <AppButton title="Create Ibadah" handlePress={handleSubmit} />
            )}
          </>
        )}
      </Formik>
    </Screen>
  );
};

export default TaskScheduler;
