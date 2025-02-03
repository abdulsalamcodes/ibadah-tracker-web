import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import Screen from "../../Components/Screen";
import { Formik } from "formik";
import AppFormFIeld from "../../Components/Form/FormField";
import { Ionicons } from "@expo/vector-icons";

import * as Yup from "yup";
import SubmitButton from "../../Components/Form/SubmitButton";
import { useNavigation } from "@react-navigation/native";
import { Route } from "../../Navigation/RoutePath";
import { supabase } from "../../Utils/Supabase";
import { useAuth } from "../../Provider/AuthPr";
import { ActivityIndicator } from "react-native";

const validationSchema = Yup.object({
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
});

const SignIn = () => {
  const navigation = useNavigation();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const submitForm = async (values: any) => {
    setLoading(true);
    await login(values.email, values.password);
    setLoading(false);
  };

  if (loading)
    return (
      <View className="flex flex-1 items-center justify-center">
        <ActivityIndicator color={"#910a51"} size={"large"} />
      </View>
    );

  return (
    <Screen>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={submitForm}
      >
        <>
          <View className="flex-1">
            <View className="justify-between py-5 ">
              <Text className="text-4xl font-popBold">Log in</Text>
              <Text className="text-3xl font-popBold">to your account</Text>
              <View />
            </View>

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
              <SubmitButton title="Log in" />
              <View className="items-center justify-center  gap-1  flex-row ">
                <Text className="text-base font-popRegular ">
                  Don't have an account?
                </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  //@ts-ignore
                  onPress={() => navigation.navigate(Route.SignUp)}
                >
                  <Text className="text-[#4ade80]">Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </>
      </Formik>
    </Screen>
  );
};

export default SignIn;
