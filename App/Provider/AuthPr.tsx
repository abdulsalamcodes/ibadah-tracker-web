import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

// Define types for authentication context
interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Load user from AsyncStorage on app start
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error loading user:", error);
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  // ✅ Sign up function
  const signUp = async (
    name: string,
    email: string,
    password: string
  ): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://ibadah-tracker-be.vercel.app/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        Alert.alert(data.message || "Signup failed");
        return;
      }

      // ✅ Store token and user in AsyncStorage
      await AsyncStorage.setItem("token", data?.data?.token);
      await AsyncStorage.setItem("user", JSON.stringify(data?.data?.user));

      // ✅ Update user state immediately
      setUser(data?.data?.user);
      Alert.alert("Signup successful!");
    } catch (error) {
      Alert.alert("Signup failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Login function
  const login = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://ibadah-tracker-be.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        Alert.alert(data.message || "Login failed");
        return;
      }

      // ✅ Store token and user in AsyncStorage
      await AsyncStorage.setItem("token", data?.data?.token);
      await AsyncStorage.setItem("user", JSON.stringify(data?.data?.user));

      // ✅ Update user state immediately
      setUser(data?.data?.user);
    } catch (error) {
      Alert.alert("Login failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout function
  const logout = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      setUser(null); // ✅ Update state immediately
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
