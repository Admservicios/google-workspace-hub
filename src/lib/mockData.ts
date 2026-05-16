import { Email } from '../types/gmail';
import { CalendarEvent } from '../types/calendar';
import { Task } from '../types/tasks';
import { ChatMessage } from '../types/gemini';
import { Note, User, ProductivityMetrics } from '../types/index';

export const mockUser: User = {
  id: 'u1',
  name: 'Admin Workspace',
  email: 'admin@workspace.com',
  avatar: 'https://i.pravatar.cc/150?u=admin',
};

export const mockMetrics: ProductivityMetrics = {
  score: 85,
  tasksCompleted: 12,
  emailsProcessed: 45,
  meetingsAttended: 3,
};

export const mockEmails: Email[] = Array.from({ length: 20 }).map((_, i) => ({
  id: `email-${i + 1}`,
  threadId: `thread-${i + 1}`,
  subject: `Reunión de Sincronización ${i + 1}`,
  snippet: `Este es un correo de prueba número ${i + 1} para verificar la funcionalidad del dashboard...`,
  from: `usuario${i + 1}@ejemplo.com`,
  to: mockUser.email,
  date: new Date(Date.now() - i * 3600000).toISOString(),
  isRead: i > 5,
  labels: i % 3 === 0 ? ['IMPORTANT', 'INBOX'] : ['INBOX'],
}));

export const mockEvents: CalendarEvent[] = Array.from({ length: 10 }).map((_, i) => {
  const start = new Date();
  start.setHours(start.getHours() + i * 2);
  const end = new Date(start);
  end.setHours(end.getHours() + 1);
  return {
    id: `event-${i + 1}`,
    title: `Reunión de Equipo ${i + 1}`,
    description: `Discusión sobre los avances del proyecto ${i + 1}`,
    start: start.toISOString(),
    end: end.toISOString(),
    attendees: ['admin@workspace.com', `cliente${i + 1}@ejemplo.com`],
    meetLink: `https://meet.google.com/abc-defg-hij`,
  };
});

export const mockTasks: Task[] = Array.from({ length: 25 }).map((_, i) => ({
  id: `task-${i + 1}`,
  title: `Completar módulo ${i + 1} de la aplicación`,
  notes: `Detalles adicionales para la tarea ${i + 1}...`,
  status: i % 4 === 0 ? 'completed' : 'needsAction',
  due: new Date(Date.now() + i * 86400000).toISOString(),
  updated: new Date().toISOString(),
}));

export const mockNotes: Note[] = Array.from({ length: 5 }).map((_, i) => ({
  id: `note-${i + 1}`,
  title: `Nota importante ${i + 1}`,
  content: `Contenido de la nota ${i + 1}. Aquí podemos guardar ideas o apuntes rápidos.`,
  updated: new Date(Date.now() - i * 86400000).toISOString(),
}));

export const mockChatHistory: ChatMessage[] = Array.from({ length: 10 }).map((_, i) => ({
  id: `msg-${i + 1}`,
  role: i % 2 === 0 ? 'user' : 'assistant',
  content: i % 2 === 0 
    ? `¿Puedes ayudarme con la tarea ${i + 1}?` 
    : `Claro, para la tarea ${i + 1} te sugiero revisar la documentación de la API.`,
  timestamp: new Date(Date.now() - (10 - i) * 60000).toISOString(),
}));
