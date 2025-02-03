import { View, Image, StyleProp, ImageStyle, ViewStyle } from "react-native";

type avatarProps = {
  bg: string;
  src: string;
  avrStyle?: StyleProp<ViewStyle>;
  imgStyle?: StyleProp<ImageStyle>;
};

const Avatar = ({ avrStyle, bg, src, imgStyle }: avatarProps) => {
  return (
    <View
      className="self-center bg-[#E4A9C1] h-[99px] w-[99px] items-center justify-center"
      style={[{ backgroundColor: bg, borderRadius: 20 }, avrStyle]}
    >
      <Image
        source={{
          uri: src,
        }}
        style={[{ width: 80, height: 80 }, imgStyle]}
      />
    </View>
  );
};

export default Avatar;
