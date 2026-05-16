"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleService = void 0;
const axios_1 = __importDefault(require("axios"));
class GoogleService {
    // Obtener correos del usuario
    async getEmails(accessToken, maxResults = 10) {
        try {
            const response = await axios_1.default.get('https://www.googleapis.com/gmail/v1/users/me/messages', {
                headers: { Authorization: `Bearer ${accessToken}` },
                params: { maxResults, q: 'category:primary' },
            });
            const messages = response.data.messages || [];
            const emails = await Promise.all(messages.map(async (msg) => {
                const detail = await axios_1.default.get(`https://www.googleapis.com/gmail/v1/users/me/messages/${msg.id}`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                    params: { format: 'metadata', metadataHeaders: ['From', 'Subject', 'Date'] },
                });
                const headers = detail.data.payload.headers;
                const from = headers.find((h) => h.name === 'From')?.value || 'Unknown';
                const subject = headers.find((h) => h.name === 'Subject')?.value || '(No Subject)';
                const date = headers.find((h) => h.name === 'Date')?.value || '';
                return {
                    id: msg.id,
                    from,
                    subject,
                    date,
                    snippet: detail.data.snippet,
                    isRead: !detail.data.labelIds?.includes('UNREAD'),
                };
            }));
            return emails;
        }
        catch (error) {
            console.error('Error fetching emails:', error);
            throw error;
        }
    }
    // Obtener eventos del calendario
    async getCalendarEvents(accessToken, maxResults = 10) {
        try {
            const response = await axios_1.default.get('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
                headers: { Authorization: `Bearer ${accessToken}` },
                params: {
                    maxResults,
                    orderBy: 'startTime',
                    singleEvents: true,
                    timeMin: new Date().toISOString(),
                },
            });
            const events = response.data.items || [];
            return events.map((event) => ({
                id: event.id,
                title: event.summary,
                startTime: event.start.dateTime || event.start.date,
                endTime: event.end.dateTime || event.end.date,
                description: event.description || '',
                location: event.location || '',
            }));
        }
        catch (error) {
            console.error('Error fetching calendar events:', error);
            throw error;
        }
    }
    // Obtener tareas
    async getTasks(accessToken) {
        try {
            const response = await axios_1.default.get('https://www.googleapis.com/tasks/v1/users/@me/lists', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            const lists = response.data.items || [];
            const allTasks = [];
            for (const list of lists) {
                const tasksResponse = await axios_1.default.get(`https://www.googleapis.com/tasks/v1/lists/${list.id}/tasks`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                const tasks = tasksResponse.data.items || [];
                allTasks.push(...tasks.map((task) => ({
                    id: task.id,
                    title: task.title,
                    completed: task.status === 'completed',
                    dueDate: task.due || null,
                    listId: list.id,
                })));
            }
            return allTasks;
        }
        catch (error) {
            console.error('Error fetching tasks:', error);
            throw error;
        }
    }
}
exports.GoogleService = GoogleService;
exports.default = new GoogleService();
