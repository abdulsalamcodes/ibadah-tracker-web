"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Circle, Plus, ChevronRight, Home, BarChart2, Settings } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const IbadahTracker = () => {
  // Sample data to demonstrate functionality
  const [ibadahList, setIbadahList] = useState([
    { id: 1, name: 'Salatul Duha', description: 'Morning prayer', completed: true, time: '09:30 AM' },
    { id: 2, name: 'Daily Quran', description: 'Read for 15 minutes', completed: false, time: 'Anytime' },
    { id: 3, name: 'Dhikr', description: 'Morning adhkar', completed: true, time: 'After Fajr' },
    { id: 4, name: 'Extra Prayer', description: 'Tahajjud', completed: false, time: 'Before Fajr' }
  ]);

  const completedCount = ibadahList.filter(item => item.completed).length;
  const progressPercentage = (completedCount / ibadahList.length) * 100;

  const toggleCompletion = (id: number) => {
    setIbadahList(ibadahList.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header with Progress */}
      <div className="sticky top-0 bg-white shadow-sm z-10">
        <div className="p-4 max-w-md mx-auto">
          <h1 className="text-xl font-semibold text-gray-900">Ibadah Tracker</h1>
          <div className="mt-2">
            <Progress value={progressPercentage} className="h-2" />
            <p className="text-sm text-gray-600 mt-1">
              {completedCount} of {ibadahList.length} completed today
            </p>
          </div>
        </div>
      </div>

      {/* Offline Status Indicator */}
      <Alert className="max-w-md mx-auto mt-2 bg-yellow-50 border-yellow-200">
        <AlertDescription className="text-yellow-800 text-sm">
          You're offline. Changes will sync when connected.
        </AlertDescription>
      </Alert>

      {/* Main Content */}
      <main className="flex-1 p-4 max-w-md mx-auto w-full">
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <h2 className="text-lg font-medium">Today's Ibadah</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ibadahList.map(ibadah => (
                <button
                  key={ibadah.id}
                  onClick={() => toggleCompletion(ibadah.id)}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    {ibadah.completed ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-400" />
                    )}
                    <div className="text-left">
                      <h3 className="font-medium text-gray-900">{ibadah.name}</h3>
                      <p className="text-sm text-gray-600">{ibadah.description}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{ibadah.time}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="flex items-center justify-between p-4 h-auto"
          >
            <span>Add Custom</span>
            <Plus className="w-4 h-4 ml-2" />
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-between p-4 h-auto"
          >
            <span>View Progress</span>
            <BarChart2 className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 bg-white border-t">
        <div className="max-w-md mx-auto flex justify-around p-2">
          <Button variant="ghost" className="flex-1">
            <Home className="w-5 h-5 text-green-500" />
          </Button>
          <Button variant="ghost" className="flex-1">
            <BarChart2 className="w-5 h-5 text-gray-500" />
          </Button>
          <Button variant="ghost" className="flex-1">
            <Settings className="w-5 h-5 text-gray-500" />
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default IbadahTracker;