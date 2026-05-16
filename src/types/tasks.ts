export interface Task {
  id: string;
  title: string;
  notes: string;
  status: 'needsAction' | 'completed';
  due?: string; // ISO string
  updated: string;
}
