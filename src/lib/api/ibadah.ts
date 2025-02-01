import axiosInstance from "./axiosConfig";
import { ApiResponse, Ibadah, CreateIbadahData } from "./types";

export const ibadahApi = {
  // Get all ibadah for current user
  getUserIbadah: async () => {
    const response = await axiosInstance.get<ApiResponse<Ibadah[]>>("/ibadah");
    return response.data;
  },

  // Create new ibadah
  createIbadah: async (data: CreateIbadahData) => {
    const response = await axiosInstance.post<ApiResponse<Ibadah>>(
      "/ibadah",
      data
    );
    return response.data;
  },

  // Toggle ibadah completion
  toggleCompletion: async (ibadahId: string, date?: string) => {
    const response = await axiosInstance.post<ApiResponse<Ibadah>>(
      `/ibadah/${ibadahId}/toggle`,
      {
        date: date || new Date().toISOString(),
      }
    );
    return response.data;
  },

  // Delete ibadah
  deleteIbadah: async (ibadahId: string) => {
    const response = await axiosInstance.delete<ApiResponse<void>>(
      `/ibadah/${ibadahId}`
    );
    return response.data;
  },
};
