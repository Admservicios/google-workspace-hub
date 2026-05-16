export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  start: string; // ISO string
  end: string;   // ISO string
  attendees: string[];
  location?: string;
  meetLink?: string;
}
