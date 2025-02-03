import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Screen from "../../Components/Screen";
import AppButton from "../../Components/AppButton";
import { MotiImage, useDynamicAnimation } from "moti";
import { useNavigation } from "@react-navigation/native";
import { Route } from "../../Navigation/RoutePath";
import { AuthStackParamList } from "../../Navigation/AuthNav";

const Welcome = () => {
  const motiImage1 = useDynamicAnimation<{ top: string; left: string }>(() => ({
    top: "25%",
    left: "20%",
  }));
  const motiImage2 = useDynamicAnimation<{ top: string; left: string }>(() => ({
    top: "28%",
    left: "60%",
  }));
  const motiImage3 = useDynamicAnimation<{ top: string; left: string }>(() => ({
    top: "58%",
    left: "25%",
  }));
  const motiImage4 = useDynamicAnimation<{ top: string; left: string }>(() => ({
    top: "21%",
    left: "30%",
  }));
  const motiImage5 = useDynamicAnimation<{ top: string; left: string }>(() => ({
    top: "27%",
    left: "50%",
  }));

  useEffect(() => {
    motiImage1.animateTo({
      top: "3%",
      left: "35%",
    });
    motiImage2.animateTo({
      top: "18%",
      left: "10%",
    });
    motiImage3.animateTo({
      top: "62%",
      left: "5%",
    });
    motiImage4.animateTo({
      top: "75%",
      left: "40%",
    });
    motiImage5.animateTo({
      top: "15%",
      left: "65%",
    });
  }, []);

  const navigation = useNavigation<AuthStackParamList>();
  return (
    <Screen>
      <View style={{ flex: 1, overflow: "hidden" }}>
        <Image
          source={require("../../../assets/images/welcome1.jpg")}
          style={{
            ...styles.image,
            top: "35%",
            left: "30%",
            width: 150,
            height: 160,
            zIndex: 1,
          }}
        />
        <Image
          source={require("../../../assets/images/welcome2.jpg")}
          style={{
            ...styles.image,
            top: "55%",
            left: "50%",
          }}
        />
        <MotiImage
          state={motiImage1}
          source={require("../../../assets/images/welcome1.jpg")}
          style={styles.image}
        />
        <MotiImage
          state={motiImage2}
          source={require("../../../assets/images/welcome2.jpg")}
          style={styles.image}
        />
        <MotiImage
          state={motiImage3}
          source={require("../../../assets/images/welcome3.jpg")}
          style={styles.image}
        />
        <MotiImage
          state={motiImage4}
          source={require("../../../assets/images/welcome3.jpg")}
          style={styles.image}
        />
        <MotiImage
          state={motiImage5}
          source={require("../../../assets/images/welcome4.png")}
          style={styles.image}
        />
      </View>
      <View className="pb-4">
        <Text className="text-2xl font-popBold">Deen tracker</Text>
        <Text className="text-slate-500 text-sm  py-2 ">
          A simple and intuitive way to track your prayers, fasting, Quran
          recitation, and other acts of worship—helping you stay consistent and
          grow closer to Allah
        </Text>
        <AppButton
          title="Let's get started"
          btnStyle={{ borderRadius: 5 }}
          //@ts-ignore
          handlePress={() => navigation.navigate(Route.Login)}
        />
      </View>
    </Screen>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    position: "absolute",
    zIndex: 0,
    overflow: "hidden",
  },
});
