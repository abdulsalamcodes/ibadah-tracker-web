"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, Loader2, Plus } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import AddCustomIbadahModal from "./AddCustomIbadahModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ibadahApi } from "@/lib/api/ibadah";
import { Ibadah } from "@/lib/api/types";

// Predefined Ibadah list
const PREDEFINED_IBADAH = [
  {
    name: "Salatul Duha",
    description: "Morning prayer between sunrise and noon",
    time: "Morning",
    frequency: "daily" as const,
  },
  {
    name: "Daily Quran",
    description: "Read Quran for at least 15 minutes",
    time: "Any Time",
    frequency: "daily" as const,
  },
  {
    name: "Morning Adhkar",
    description: "Morning remembrance of Allah",
    time: "After Fajr",
    frequency: "daily" as const,
  },
  {
    name: "Evening Adhkar",
    description: "Evening remembrance of Allah",
    time: "After Asr",
    frequency: "daily" as const,
  },
  {
    name: "Tahajjud",
    description: "Night prayer",
    time: "Before Fajr",
    frequency: "daily" as const,
  },
];

const IbadahTracker = () => {
  const [ibadahList, setIbadahList] = useState<Ibadah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Fetch user's ibadah
  useEffect(() => {
    fetchIbadahList();
  }, []);

  const fetchIbadahList = async () => {
    try {
      setLoading(true);
      const response = await ibadahApi.getUserIbadah();
      setIbadahList(response.data);
    } catch (err) {
      setError("Failed to fetch ibadah list");
      console.error("Error fetching ibadah:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPredefined = async (
    predefinedIbadah: (typeof PREDEFINED_IBADAH)[0]
  ) => {
    try {
      const response = await ibadahApi.createIbadah(predefinedIbadah);
      setIbadahList([...ibadahList, response.data]);
      setIsAddDialogOpen(false);
    } catch (err) {
      console.error("Error adding predefined ibadah:", err);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddCustom = async (customIbadah: any) => {
    try {
      const response = await ibadahApi.createIbadah({
        ...customIbadah,
        frequency: "daily",
      });
      setIbadahList([...ibadahList, response.data]);
    } catch (err) {
      console.error("Error adding custom ibadah:", err);
    }
  };

  const toggleCompletion = async (ibadahId: string) => {
    try {
      const response = await ibadahApi.toggleCompletion(ibadahId);
      setIbadahList(
        ibadahList.map((item) => (item._id === ibadahId ? response.data : item))
      );
    } catch (err) {
      console.error("Error toggling completion:", err);
    }
  };

  const completedCount = ibadahList.filter((item) =>
    item.completionStatus.some(
      (status) =>
        new Date(status.date).toDateString() === new Date().toDateString() &&
        status.completed
    )
  ).length;
  const progressPercentage = (completedCount / ibadahList.length) * 100;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header with Progress */}
      <div className="sticky top-0 bg-white shadow-sm z-10">
        <div className="p-4 max-w-md mx-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            Ibadah Tracker
          </h1>
          <div className="mt-2">
            <Progress value={progressPercentage} className="h-2" />
            <p className="text-sm text-gray-600 mt-1">
              {completedCount} of {ibadahList.length} completed today
            </p>
          </div>
        </div>
      </div>

      {/* Offline Status Indicator */}
      {isOffline && (
        <Alert className="max-w-md mx-auto mt-2 bg-yellow-50 border-yellow-200">
          <AlertDescription className="text-yellow-800 text-sm">
            You&apos;re offline. Changes will sync when connected.
          </AlertDescription>
        </Alert>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 max-w-md mx-auto w-full">
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <h2 className="text-lg font-medium">Today&apos;s Ibadah</h2>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin my-4" />
            ) : error ? (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-3">
                {ibadahList.map((ibadah) => (
                  <button
                    key={ibadah._id}
                    onClick={() => toggleCompletion(ibadah._id)}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      {ibadah.completionStatus.some(
                        (status) =>
                          new Date(status.date).toDateString() ===
                            new Date().toDateString() && status.completed
                      ) ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-400" />
                      )}
                      <div className="text-left">
                        <h3 className="font-medium text-gray-900">
                          {ibadah.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {ibadah.description}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{ibadah.time}</span>
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add Ibadah Options */}
        <div className="grid grid-cols-1 gap-4">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Ibadah
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Ibadah</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <h3 className="font-medium">Predefined Ibadah</h3>
                <div className="grid gap-2">
                  {PREDEFINED_IBADAH.map((ibadah, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="justify-start"
                      onClick={() => handleAddPredefined(ibadah)}
                    >
                      <span>{ibadah.name}</span>
                    </Button>
                  ))}
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or
                    </span>
                  </div>
                </div>
                <AddCustomIbadahModal onAddIbadah={handleAddCustom} />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
};

export default IbadahTracker;
