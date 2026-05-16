import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';

export const getNotes = async (req: AuthRequest, res: Response): Promise<void> => {
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
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
};

export const createNote = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, content, tags } = req.body as {
      title: string;
      content: string;
      tags?: string[];
    };

    if (!title || !content) {
      res.status(400).json({ error: 'Title and content are required' });
      return;
    }

    const user = await prisma.user.upsert({
      where: { email: req.user!.email },
      update: {},
      create: { email: req.user!.email, googleId: req.user!.googleId },
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
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ error: 'Failed to create note' });
  }
};

export const deleteNote = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = req.params['id'] as string;
    await prisma.note.delete({ where: { id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete note' });
  }
};
