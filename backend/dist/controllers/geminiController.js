"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatWithGemini = void 0;
const geminiService_1 = __importDefault(require("../services/geminiService"));
const chatWithGemini = async (req, res) => {
    try {
        const { message, history, context } = req.body;
        if (!message || typeof message !== 'string') {
            res.status(400).json({ error: 'Message is required' });
            return;
        }
        const reply = await geminiService_1.default.chat(message, history || [], context);
        res.json({ reply });
    }
    catch (error) {
        console.error('Gemini error:', error);
        res.status(500).json({ error: 'Failed to get AI response' });
    }
};
exports.chatWithGemini = chatWithGemini;
