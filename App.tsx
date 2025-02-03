import Fonts from "./App/config/Fonts";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { AuthProvider } from "./App/Provider/AuthPr";
import RootNav from "./App/Navigation/RootNav";
export default function App() {
  const [loaded, error] = useFonts(Fonts);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  return (
    <AuthProvider>
      <RootNav />
    </AuthProvider>
  );
}
