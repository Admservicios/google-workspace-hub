'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/store/appStore';
import Dashboard from '@/components/Dashboard';

export default function Home() {
  const isDark = useAppStore((state) => state.isDarkMode);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
      <Dashboard />
    </main>
  );
}
