'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/store/appStore';
import Dashboard from '@/components/Dashboard';

export default function Home() {
  useEffect(() => {
    const isDark = useAppStore((state) => state.isDarkMode);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <Dashboard />
    </main>
  );
}
