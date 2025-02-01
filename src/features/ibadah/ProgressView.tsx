"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Award, Loader2 } from "lucide-react";
import { progressApi, ProgressData } from "@/lib/api/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ProgressView = () => {
  const [timeframe, setTimeframe] = useState<"week" | "month">("week");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progressData, setProgressData] = useState<ProgressData | null>(null);

  useEffect(() => {
    fetchProgress();
  }, [timeframe]);

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
      <div className="flex justify-center items-center h-full py-4 ">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (error || !progressData) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex flex-col space-y-4 p-4 max-w-lg mx-auto">
      {/* Header with time frame selection */}
      <div className="flex justify-between items-center w-full">
        <h1 className="text-xl font-semibold">Your Progress</h1>
        <div className="flex gap-2">
          <Button
            variant={timeframe === "week" ? "default" : "outline"}
            onClick={() => setTimeframe("week")}
            size="sm"
          >
            Week
          </Button>
          <Button
            variant={timeframe === "month" ? "default" : "outline"}
            onClick={() => setTimeframe("month")}
            size="sm"
          >
            Month
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Average Completion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">
                {progressData.averageCompletion}%
              </span>
            </div>
            <Progress value={progressData.averageCompletion} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Completions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">
                {progressData.totalCompletions}
              </span>
              <span className="ml-1 text-sm text-gray-500">acts</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Completion Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Daily Completion Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData.dailyProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis unit="%" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-2 border rounded shadow">
                          <p className="font-medium">
                            {payload[0].value}% completed
                          </p>
                          <p className="text-sm text-gray-500">
                            {payload[0].payload.totalCompleted} of{" "}
                            {payload[0].payload.total} tasks
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="completionRate"
                  stroke="#4ade80"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Individual Ibadah Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Ibadah Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {progressData.individualProgress.map((ibadah) => (
              <div key={ibadah.id}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{ibadah.name}</span>
                  <span className="text-sm text-gray-500">
                    {ibadah.completedDays}/{ibadah.totalDays} days
                  </span>
                </div>
                <Progress value={ibadah.completionRate} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Streaks and Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Current Streaks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Award className="text-yellow-500 h-6 w-6" />
              <div>
                <p className="font-medium">
                  {progressData.streaks.current} day streak
                </p>
                <p className="text-sm text-gray-500">
                  Longest streak: {progressData.streaks.longest} days
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={fetchProgress}>
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressView;
