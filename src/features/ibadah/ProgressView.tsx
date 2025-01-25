"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Calendar, TrendingUp, Award } from 'lucide-react';

interface IbadahProgress {
  date: string;
  completionRate: number;
  totalCompleted: number;
}

const ProgressView = () => {
  // Sample data - in a real app, this would come from your backend
  const weeklyData: IbadahProgress[] = [
    { date: 'Sun', completionRate: 80, totalCompleted: 4 },
    { date: 'Mon', completionRate: 100, totalCompleted: 5 },
    { date: 'Tue', completionRate: 60, totalCompleted: 3 },
    { date: 'Wed', completionRate: 85, totalCompleted: 5 },
    { date: 'Thu', completionRate: 90, totalCompleted: 4 },
    { date: 'Fri', completionRate: 95, totalCompleted: 5 },
    { date: 'Sat', completionRate: 70, totalCompleted: 3 },
  ];

  const [timeframe, setTimeframe] = useState<'week' | 'month'>('week');

  // Calculate overall statistics
  const averageCompletion = Math.round(
    weeklyData.reduce((acc, day) => acc + day.completionRate, 0) / weeklyData.length
  );

  const totalCompletions = weeklyData.reduce((acc, day) => acc + day.totalCompleted, 0);

  return (
    <div className="flex flex-col space-y-4 p-4 max-w-lg mx-auto">
      {/* Header with time frame selection */}
      <div className="flex justify-between items-center w-full">
        <h1 className="text-xl font-semibold">Your Progress</h1>
        <div className="flex gap-2">
          <Button 
            variant={timeframe === 'week' ? 'default' : 'outline'}
            onClick={() => setTimeframe('week')}
            size="sm"
          >
            Week
          </Button>
          <Button
            variant={timeframe === 'month' ? 'default' : 'outline'}
            onClick={() => setTimeframe('month')}
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
              <span className="text-2xl font-bold">{averageCompletion}%</span>
            </div>
            <Progress value={averageCompletion} className="mt-2" />
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
              <span className="text-2xl font-bold">{totalCompletions}</span>
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
              <LineChart data={weeklyData}>
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
            {/* Salatul Duha Example */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Salatul Duha</span>
                <span className="text-sm text-gray-500">5/7 days</span>
              </div>
              <Progress value={71} />
            </div>
            {/* Daily Quran Example */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Daily Quran</span>
                <span className="text-sm text-gray-500">6/7 days</span>
              </div>
              <Progress value={85} />
            </div>
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
              <Award className="text-yellow-500" />
              <div>
                <p className="font-medium">5 day streak</p>
                <p className="text-sm text-gray-500">Keep it up!</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Details</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressView;