import { Router } from 'express';
import { getEmails, markAsRead } from '../controllers/gmailController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/emails', authMiddleware, getEmails);
router.patch('/emails/:messageId/read', authMiddleware, markAsRead);

export default router;
