"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTasks = void 0;
const googleService_1 = __importDefault(require("../services/googleService"));
const getTasks = async (req, res) => {
    try {
        if (!req.user?.accessToken) {
            res.status(401).json({ error: 'No access token' });
            return;
        }
        const tasks = await googleService_1.default.getTasks(req.user.accessToken);
        res.json({ tasks });
    }
    catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
};
exports.getTasks = getTasks;
