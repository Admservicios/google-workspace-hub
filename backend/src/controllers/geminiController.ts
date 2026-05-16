import { Response } from 'express';
import GeminiService from '../services/geminiService';
import { AuthRequest } from '../middleware/auth';

export const chatWithGemini = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { message, history, context } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const reply = await GeminiService.chat(message, history || [], context);
    res.json({ reply });
  } catch (error) {
    console.error('Gemini error:', error);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
};
