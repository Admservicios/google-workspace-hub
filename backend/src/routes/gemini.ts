import { Router } from 'express';
import { chatWithGemini } from '../controllers/geminiController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/chat', authMiddleware, chatWithGemini);

export default router;
