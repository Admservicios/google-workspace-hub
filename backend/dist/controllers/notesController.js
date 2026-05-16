"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.createNote = exports.getNotes = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getNotes = async (req, res) => {
    try {
        // First find the user by email
        const user = await prisma.user.findUnique({
            where: { email: req.user?.email ?? '' },
        });
        if (!user) {
            res.json({ notes: [] });
            return;
        }
        const notes = await prisma.note.findMany({
            where: { userId: user.id },
            orderBy: { updatedAt: 'desc' },
        });
        res.json({ notes });
    }
    catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ error: 'Failed to fetch notes' });
    }
};
exports.getNotes = getNotes;
const createNote = async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        if (!title || !content) {
            res.status(400).json({ error: 'Title and content are required' });
            return;
        }
        const user = await prisma.user.upsert({
            where: { email: req.user.email },
            update: {},
            create: { email: req.user.email, googleId: req.user.googleId },
        });
        const note = await prisma.note.create({
            data: {
                title,
                content,
                tags: Array.isArray(tags) ? tags : [],
                userId: user.id,
            },
        });
        res.status(201).json({ note });
    }
    catch (error) {
        console.error('Error creating note:', error);
        res.status(500).json({ error: 'Failed to create note' });
    }
};
exports.createNote = createNote;
const deleteNote = async (req, res) => {
    try {
        const id = req.params['id'];
        await prisma.note.delete({ where: { id } });
        res.json({ success: true });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete note' });
    }
};
exports.deleteNote = deleteNote;
