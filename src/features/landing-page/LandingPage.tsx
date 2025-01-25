"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Star, Download, ChevronRight } from 'lucide-react';

const LandingPage = () => {
  const handleDownload = () => {
    // Implement app store redirection logic
    window.open('your-app-store-link', '_blank');
  };

  const handleGetStarted = () => {
    // Navigate to auth page
    window.location.href = '/auth';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-green-600">Ibadah Tracker</span>
            </div>
            <div className="flex space-x-4">
              <Button variant="ghost" onClick={handleGetStarted}>Login</Button>
              <Button onClick={handleGetStarted}>Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              Track Your Spiritual Journey
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Maintain consistency in your daily worship with our simple, 
              intuitive Ibadah tracking app. Stay connected to your spiritual goals.
            </p>
            <div className="mt-5 max-w-md mx-auto flex justify-center gap-3 md:mt-8">
              <Button size="lg" onClick={handleGetStarted}>
                Start Free
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Get Mobile App
              </Button>
            </div>
          </div>
        </div>

        {/* Feature Section */}
        <div className="mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Feature Cards */}
              <Card>
                <CardContent className="p-6">
                  <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Easy Tracking</h3>
                  <p className="text-gray-600">
                    Track your daily prayers, Quran reading, and other acts of worship with just one tap.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <Star className="h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Progress Insights</h3>
                  <p className="text-gray-600">
                    Visualize your spiritual journey and maintain consistency in worship.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <Download className="h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Offline Support</h3>
                  <p className="text-gray-600">
                    Continue tracking your ibadah even without an internet connection.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500">
            <p>© 2024 Ibadah Tracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;