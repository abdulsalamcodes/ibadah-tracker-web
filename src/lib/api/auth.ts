// src/lib/api/auth.ts
import axiosInstance from "./axiosConfig";
import { AuthResponse, LoginData, RegisterData } from "./types";

export const authApi = {
  login: async (data: LoginData) => {
    const response = await axiosInstance.post<AuthResponse>(
      "/auth/login",
      data
    );
    return response.data;
  },

  register: async (data: RegisterData) => {
    const response = await axiosInstance.post<AuthResponse>(
      "/auth/register",
      data
    );
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("auth_token");
  },
};
