// src/lib/api/settings.ts
import axiosInstance from "./axiosConfig";

export interface UserSettings {
  notifications: boolean;
  darkMode: boolean;
  language: "en" | "ar";
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const settingsApi = {
  getSettings: async () => {
    const response = await axiosInstance.get<ApiResponse<UserSettings>>(
      "/settings"
    );
    return response.data;
  },

  updateSettings: async (settings: Partial<UserSettings>) => {
    const response = await axiosInstance.put<ApiResponse<UserSettings>>(
      "/settings",
      settings
    );
    return response.data;
  },

  exportData: async () => {
    const response = await axiosInstance.get("/settings/export", {
      responseType: "blob",
    });
    return response.data;
  },

  deleteAccount: async () => {
    const response = await axiosInstance.delete<ApiResponse<void>>(
      "/settings/account"
    );
    return response.data;
  },
};
