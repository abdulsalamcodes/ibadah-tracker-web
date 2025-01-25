// app/dashboard/layout.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Home, BarChart2, Settings } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  
  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      router.push('/auth');
    }
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Main content area */}
      <main className="flex-1">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 bg-white border-t">
        <div className="max-w-md mx-auto flex justify-around p-2">
          <Button 
            variant="ghost" 
            className="flex-1"
            onClick={() => router.push('/dashboard')}
          >
            <Home className="w-5 h-5" />
          </Button>
          <Button 
            variant="ghost" 
            className="flex-1"
            onClick={() => router.push('/dashboard/progress')}
          >
            <BarChart2 className="w-5 h-5" />
          </Button>
          <Button 
            variant="ghost" 
            className="flex-1"
            onClick={() => router.push('/dashboard/settings')}
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </nav>
    </div>
  );
}