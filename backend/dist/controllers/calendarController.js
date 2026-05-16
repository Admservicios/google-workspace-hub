"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCalendarEvents = void 0;
const googleService_1 = __importDefault(require("../services/googleService"));
const getCalendarEvents = async (req, res) => {
    try {
        if (!req.user?.accessToken) {
            res.status(401).json({ error: 'No access token' });
            return;
        }
        const events = await googleService_1.default.getCalendarEvents(req.user.accessToken, 10);
        res.json({ events });
    }
    catch (error) {
        console.error('Error fetching calendar events:', error);
        res.status(500).json({ error: 'Failed to fetch calendar events' });
    }
};
exports.getCalendarEvents = getCalendarEvents;
