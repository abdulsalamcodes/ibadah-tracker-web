import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Screen from "../../Components/Screen";
import { Formik } from "formik";
import AppFormFIeld from "../../Components/Form/FormField";
import { Ionicons } from "@expo/vector-icons";

import * as Yup from "yup";
import SubmitButton from "../../Components/Form/SubmitButton";
import { useNavigation } from "@react-navigation/native";
import { Route } from "../../Navigation/RoutePath";
import { useAuth } from "../../Provider/AuthPr";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),

  email: Yup.string().required("Email is required").email("Email is not valid"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character"
    ),

  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const submitForm = async (values: any) => {
    setLoading(true);
    await signUp(values.name, values.email, values.password);
    setLoading(false);
  };

  const navigation = useNavigation();

  if (loading)
    return (
      <View className="flex flex-1 items-center justify-center">
        <ActivityIndicator color={"#910a51"} size={"large"} />
      </View>
    );
  return (
    <Screen>
      <ScrollView>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={submitForm}
        >
          <>
            <View className="flex-1">
              <View className="flex-row items-center justify-between py-5 ">
                <TouchableOpacity
                  className="bg-slate-300 p-2  rounded-full "
                  onPress={() => navigation.goBack()}
                >
                  <Ionicons name="arrow-back-outline" size={23} />
                </TouchableOpacity>
                <Text className="text-2xl font-popBold">
                  Set up your Account
                </Text>
                <View />
              </View>
              <Text className="text-sm text-center font-popLight text-zinc-500 ">
                Please complete all information to create your account
              </Text>
              <View>
                <Text className="text-sm font-popRegular text-slate-500 pt-3">
                  Email
                </Text>

                <AppFormFIeld
                  spellCheck={false}
                  name="email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholder="Email"
                  autoCorrect={false}
                />
              </View>
              <View>
                <Text className="text-sm font-popRegular text-slate-500">
                  Full Name
                </Text>
                <AppFormFIeld
                  spellCheck={false}
                  name="name"
                  placeholder="Full Name"
                />
              </View>

              <View>
                <Text className="text-sm font-popRegular text-slate-500 pt-3 ">
                  Password
                </Text>

                <AppFormFIeld
                  spellCheck={false}
                  name="password"
                  placeholder="Password"
                  autoCorrect={false}
                />
              </View>

              <View>
                <Text className="text-sm font-popRegular text-slate-500 pt-3 ">
                  Confirm password
                </Text>

                <AppFormFIeld
                  spellCheck={false}
                  name="confirmPassword"
                  // secureTextEntry={!visible}
                  placeholder="Confirm Password"
                  autoCorrect={false}
                />
              </View>
            </View>
            <View>
              <SubmitButton title="Submit" />
              <View className="items-center justify-center  gap-1  flex-row ">
                <Text className="text-base font-popRegular ">
                  Already have an account?
                </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  //@ts-ignore
                  onPress={() => navigation.navigate(Route.Login)}
                >
                  <Text className="text-[#4ade80]">Sign in</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        </Formik>
      </ScrollView>
    </Screen>
  );
};

export default SignUp;
