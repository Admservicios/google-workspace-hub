import { Response } from 'express';
import GoogleService from '../services/googleService';
import { AuthRequest } from '../middleware/auth';

export const getCalendarEvents = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user?.accessToken) {
      res.status(401).json({ error: 'No access token' });
      return;
    }

    const events = await GoogleService.getCalendarEvents(req.user.accessToken, 10);
    res.json({ events });
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    res.status(500).json({ error: 'Failed to fetch calendar events' });
  }
};
