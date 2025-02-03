import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { MaterialIcons } from "@expo/vector-icons";
import { progressApi } from "../../Services/Progress";
import Screen from "../../Components/Screen";
import { useFocusEffect } from "@react-navigation/native";

interface ProgressData {
  averageCompletion: number;
  totalCompletions: number;
  dailyProgress: Array<{
    date: string;
    completionRate: number;
    totalCompleted: number;
    total: number;
  }>;
  individualProgress: Array<{
    id: string;
    name: string;
    completedDays: number;
    totalDays: number;
    completionRate: number;
  }>;
  streaks: {
    current: number;
    longest: number;
  };
}

const ProgressScreen = () => {
  const [timeframe, setTimeframe] = useState<"week" | "month">("week");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progressData, setProgressData] = useState<ProgressData | null>(null);

  useFocusEffect(
    useCallback(() => {
      fetchProgress();
    }, [timeframe])
  );

  const fetchProgress = async () => {
    try {
      setLoading(true);
      const response = await progressApi.getProgress(timeframe);
      setProgressData(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to load progress data");
      console.error("Error fetching progress:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4ade80" />
      </View>
    );
  }

  if (error || !progressData) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchProgress}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const chartData = {
    labels: progressData.dailyProgress.map((d) => d.date),
    datasets: [
      {
        data: progressData.dailyProgress.map((d) => d.completionRate),
      },
    ],
  };

  return (
    <Screen>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Your Progress</Text>
          <View style={styles.timeframeButtons}>
            <TouchableOpacity
              style={[
                styles.timeframeButton,
                timeframe === "week" && styles.activeTimeframeButton,
              ]}
              onPress={() => setTimeframe("week")}
            >
              <Text
                style={[
                  styles.timeframeButtonText,
                  timeframe === "week" && styles.activeTimeframeButtonText,
                ]}
              >
                Week
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.timeframeButton,
                timeframe === "month" && styles.activeTimeframeButton,
              ]}
              onPress={() => setTimeframe("month")}
            >
              <Text
                style={[
                  styles.timeframeButtonText,
                  timeframe === "month" && styles.activeTimeframeButtonText,
                ]}
              >
                Month
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Average Completion</Text>
            <Text style={styles.summaryValue}>
              {progressData.averageCompletion}%
            </Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${progressData.averageCompletion}%` },
                ]}
              />
            </View>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Total Completions</Text>
            <Text style={styles.summaryValue}>
              {progressData.totalCompletions}
              <Text style={styles.summarySubtext}> acts</Text>
            </Text>
          </View>
        </View>

        {/* Chart */}
        <View style={styles.chartCard}>
          <Text style={styles.cardTitle}>Daily Completion Rate</Text>
          <LineChart
            data={chartData}
            width={Dimensions.get("window").width - 32}
            height={220}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(74, 222, 128, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#4ade80",
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>

        {/* Individual Progress */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Ibadah Breakdown</Text>
          {progressData.individualProgress.map((ibadah) => (
            <View key={ibadah.id} style={styles.progressItem}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressTitle}>{ibadah.name}</Text>
                <Text style={styles.progressStats}>
                  {ibadah.completedDays}/{ibadah.totalDays} days
                </Text>
              </View>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${ibadah.completionRate}%` },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>

        {/* Streaks */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Current Streaks</Text>
          <View style={styles.streakContainer}>
            <View style={styles.streakInfo}>
              <MaterialIcons name="emoji-events" size={24} color="#fbbf24" />
              <View style={styles.streakTexts}>
                <Text style={styles.streakValue}>
                  {progressData.streaks.current} day streak
                </Text>
                <Text style={styles.streakSubtext}>
                  Longest: {progressData.streaks.longest} days
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.refreshButton}
              onPress={fetchProgress}
            >
              <MaterialIcons name="refresh" size={20} color="#64748b" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 6,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f172a",
  },
  timeframeButtons: {
    flexDirection: "row",
    backgroundColor: "#f1f5f9",
    padding: 4,
    borderRadius: 8,
  },
  timeframeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  activeTimeframeButton: {
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  timeframeButtonText: {
    color: "#64748b",
    fontSize: 14,
    fontWeight: "500",
  },
  activeTimeframeButtonText: {
    color: "#0f172a",
  },
  summaryContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f172a",
  },
  summarySubtext: {
    fontSize: 14,
    color: "#64748b",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  chartCard: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 12,
  },
  chart: {
    marginLeft: -16,
    borderRadius: 8,
  },
  progressItem: {
    marginBottom: 12,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  progressTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#0f172a",
  },
  progressStats: {
    fontSize: 12,
    color: "#64748b",
  },
  progressBar: {
    height: 6,
    backgroundColor: "#f1f5f9",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4ade80",
    borderRadius: 3,
  },
  streakContainer: {
    flexDirection: "row",
    marginRight: 30,
    justifyContent: "space-between",
    alignItems: "center",
  },
  streakInfo: {
    flexDirection: "row",
    alignItems: "center",
    // gap: 12,
  },
  streakTexts: {
    flex: 1,
  },
  streakValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
  },
  streakSubtext: {
    fontSize: 12,
    color: "#64748b",
  },
  refreshButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#f8fafc",
  },
  errorText: {
    fontSize: 16,
    color: "#ef4444",
    marginBottom: 12,
    textAlign: "center",
  },
  retryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#4ade80",
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },
});

export default ProgressScreen;
