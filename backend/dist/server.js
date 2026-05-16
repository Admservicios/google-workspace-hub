"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const auth_1 = __importDefault(require("./routes/auth"));
const gmail_1 = __importDefault(require("./routes/gmail"));
const calendar_1 = __importDefault(require("./routes/calendar"));
const tasks_1 = __importDefault(require("./routes/tasks"));
const gemini_1 = __importDefault(require("./routes/gemini"));
const notes_1 = __importDefault(require("./routes/notes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: process.env.CORS_ORIGIN?.split(',') || '*',
        credentials: true,
    },
});
exports.io = io;
const PORT = process.env.PORT || 3001;
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN?.split(',') || '*',
    credentials: true,
}));
// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});
// WebSocket events
io.on('connection', (socket) => {
    console.log('Nueva conexión:', socket.id);
    socket.on('disconnect', () => {
        console.log('Desconectado:', socket.id);
    });
});
// Rutas
app.use('/api/auth', auth_1.default);
app.use('/api/gmail', gmail_1.default);
app.use('/api/calendar', calendar_1.default);
app.use('/api/tasks', tasks_1.default);
app.use('/api/gemini', gemini_1.default);
app.use('/api/notes', notes_1.default);
// Error handler
app.use((err, req, res) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
});
httpServer.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
    console.log(`Acceso: http://localhost:${PORT}`);
});
