import { Response } from 'express';
import GoogleService from '../services/googleService';
import { AuthRequest } from '../middleware/auth';

export const getTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user?.accessToken) {
      res.status(401).json({ error: 'No access token' });
      return;
    }

    const tasks = await GoogleService.getTasks(req.user.accessToken);
    res.json({ tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};
