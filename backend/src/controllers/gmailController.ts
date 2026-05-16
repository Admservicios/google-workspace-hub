import { Response } from 'express';
import GoogleService from '../services/googleService';
import { AuthRequest } from '../middleware/auth';

export const getEmails = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user?.accessToken) {
      res.status(401).json({ error: 'No access token' });
      return;
    }

    const emails = await GoogleService.getEmails(req.user.accessToken, 10);
    res.json({ emails });
  } catch (error) {
    console.error('Error fetching emails:', error);
    res.status(500).json({ error: 'Failed to fetch emails' });
  }
};

export const markAsRead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { messageId } = req.params;

    if (!req.user?.accessToken) {
      res.status(401).json({ error: 'No access token' });
      return;
    }

    // Implementar marcar como leído (se expande en siguiente paso)
    console.log(`Marking message ${messageId} as read`);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark email as read' });
  }
};
