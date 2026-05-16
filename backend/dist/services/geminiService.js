"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiService = void 0;
const axios_1 = __importDefault(require("axios"));
class GeminiService {
    constructor() {
        this.apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
    }
    async chat(userMessage, history = [], context) {
        try {
            const systemContext = context
                ? `Eres un asistente de productividad de Google Workspace. Contexto actual del usuario: ${context}\n\n`
                : 'Eres un asistente de productividad de Google Workspace. Ayuda al usuario con sus tareas, emails y calendario.\n\n';
            const contents = [
                ...history,
                {
                    role: 'user',
                    parts: [{ text: systemContext + userMessage }],
                },
            ];
            const response = await axios_1.default.post(`${this.apiUrl}?key=${process.env.GEMINI_API_KEY}`, { contents }, { headers: { 'Content-Type': 'application/json' } });
            const candidate = response.data.candidates?.[0];
            return candidate?.content?.parts?.[0]?.text || 'No response from Gemini';
        }
        catch (error) {
            console.error('Error calling Gemini API:', error);
            throw new Error('Failed to get Gemini response');
        }
    }
}
exports.GeminiService = GeminiService;
exports.default = new GeminiService();
