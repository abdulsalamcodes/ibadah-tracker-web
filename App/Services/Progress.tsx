import AsyncStorage from "@react-native-async-storage/async-storage";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

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
  getProgress: async (
    timeframe: "week" | "month" = "week"
  ): Promise<ApiResponse<ProgressData>> => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        `https://ibadah-tracker-be.vercel.app/api/progress?timeframe=${timeframe}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ Add auth token
            // Add authentication token or any headers you need
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch progress data");
      }

      const data: ApiResponse<ProgressData> = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching progress:", error);
      throw error;
    }
  },
};
