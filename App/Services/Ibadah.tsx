import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchIbadah = async (freq: string) => {
  try {
    // ✅ Retrieve token from AsyncStorage
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication token missing. Please log in again.");
    }

    // ✅ Make API request
    const response = await fetch(
      "https://ibadah-tracker-be.vercel.app/api/ibadah",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Add auth token
        },
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch Ibadah");
    }

    const dailyIbadah = data?.data?.filter(
      (ibadah: any) => ibadah.frequency === freq
    );

    return dailyIbadah; // Assuming the response contains { data: [...] }
  } catch (error: any) {
    console.error("Fetch Ibadah error:", error.message);
    throw error;
  }
};

export const toggleCompletion = async (ibadahId: string, date?: string) => {
  try {
    const token = await AsyncStorage.getItem("token");

    const response = await fetch(
      `https://ibadah-tracker-be.vercel.app/api/ibadah/${ibadahId}/toggle`, // Replace with your actual endpoint
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Add auth token
        },
        body: JSON.stringify({
          date: date || new Date().toISOString(),
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to toggle completion");
    }

    const data = await response.json();
    return data; // This should match your expected ApiResponse structure
  } catch (error) {
    console.error("Error toggling completion:", error);
    throw error;
  }
};
