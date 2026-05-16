'use client';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { ProductivityMeter } from './ProductivityMeter';
import { GmailPanel } from './GmailPanel';
import { CalendarView } from './CalendarView';
import { TasksManager } from './TasksManager';
import { NotesEditor } from './NotesEditor';
import { GeminiChat } from './GeminiChat';

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <ProductivityMeter />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <GmailPanel />
              <CalendarView />
              <TasksManager />
              <NotesEditor />
              <GeminiChat />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
