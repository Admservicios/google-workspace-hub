export interface Note {
  id: string;
  title: string;
  content: string;
  updated: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface ProductivityMetrics {
  score: number;
  tasksCompleted: number;
  emailsProcessed: number;
  meetingsAttended: number;
}
