export interface Email {
  id: string;
  threadId: string;
  subject: string;
  snippet: string;
  from: string;
  to: string;
  date: string;
  isRead: boolean;
  labels: string[];
}
