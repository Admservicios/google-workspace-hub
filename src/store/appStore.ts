import { create } from 'zustand';
import { Email } from '../types/gmail';
import { CalendarEvent } from '../types/calendar';
import { Task } from '../types/tasks';
import { Note, User, ProductivityMetrics } from '../types/index';
import { ChatMessage } from '../types/gemini';
import { mockUser, mockEmails, mockEvents, mockTasks, mockNotes, mockChatHistory, mockMetrics } from '../lib/mockData';

interface AppState {
  user: User | null;
  emails: Email[];
  events: CalendarEvent[];
  tasks: Task[];
  notes: Note[];
  chatHistory: ChatMessage[];
  isDarkMode: boolean;
  metrics: ProductivityMetrics;
  
  // Actions
  toggleDarkMode: () => void;
  addNote: (note: Note) => void;
  updateNote: (note: Note) => void;
  deleteNote: (id: string) => void;
  
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  toggleTaskStatus: (id: string) => void;
  
  addChatMessage: (msg: ChatMessage) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: mockUser,
  emails: mockEmails,
  events: mockEvents,
  tasks: mockTasks,
  notes: mockNotes,
  chatHistory: mockChatHistory,
  isDarkMode: false,
  metrics: mockMetrics,

  toggleDarkMode: () => set((state) => {
    const newDarkMode = !state.isDarkMode;
    if (typeof window !== 'undefined') {
      if (newDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
    return { isDarkMode: newDarkMode };
  }),
  
  addNote: (note) => set((state) => ({ notes: [note, ...state.notes] })),
  updateNote: (updatedNote) => set((state) => ({
    notes: state.notes.map(n => n.id === updatedNote.id ? updatedNote : n)
  })),
  deleteNote: (id) => set((state) => ({ notes: state.notes.filter(n => n.id !== id) })),
  
  addTask: (task) => set((state) => ({ tasks: [task, ...state.tasks] })),
  updateTask: (updatedTask) => set((state) => ({
    tasks: state.tasks.map(t => t.id === updatedTask.id ? updatedTask : t)
  })),
  toggleTaskStatus: (id) => set((state) => ({
    tasks: state.tasks.map(t => t.id === id ? { ...t, status: t.status === 'completed' ? 'needsAction' : 'completed' } : t)
  })),
  
  addChatMessage: (msg) => set((state) => ({ chatHistory: [...state.chatHistory, msg] })),
}));
