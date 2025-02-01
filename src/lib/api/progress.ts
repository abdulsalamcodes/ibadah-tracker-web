import axiosInstance from "./axiosConfig";
import { ApiResponse } from "./types";

export interface ProgressData {
  dailyProgress: {
    date: string;
    fullDate: string;
    completionRate: number;
    totalCompleted: number;
    total: number;
  }[];
  averageCompletion: number;
  totalCompletions: number;
  streaks: {
    current: number;
    longest: number;
  };
  individualProgress: {
    id: string;
    name: string;
    completedDays: number;
    totalDays: number;
    completionRate: number;
  }[];
}

export const progressApi = {
  getProgress: async (timeframe: "week" | "month" = "week") => {
    const response = await axiosInstance.get<ApiResponse<ProgressData>>(
      `/progress?timeframe=${timeframe}`
    );
    return response.data;
  },
};
