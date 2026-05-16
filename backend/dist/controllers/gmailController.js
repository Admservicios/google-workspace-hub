"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markAsRead = exports.getEmails = void 0;
const googleService_1 = __importDefault(require("../services/googleService"));
const getEmails = async (req, res) => {
    try {
        if (!req.user?.accessToken) {
            res.status(401).json({ error: 'No access token' });
            return;
        }
        const emails = await googleService_1.default.getEmails(req.user.accessToken, 10);
        res.json({ emails });
    }
    catch (error) {
        console.error('Error fetching emails:', error);
        res.status(500).json({ error: 'Failed to fetch emails' });
    }
};
exports.getEmails = getEmails;
const markAsRead = async (req, res) => {
    try {
        const { messageId } = req.params;
        if (!req.user?.accessToken) {
            res.status(401).json({ error: 'No access token' });
            return;
        }
        // Implementar marcar como leído (se expande en siguiente paso)
        console.log(`Marking message ${messageId} as read`);
        res.json({ success: true });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to mark email as read' });
    }
};
exports.markAsRead = markAsRead;
