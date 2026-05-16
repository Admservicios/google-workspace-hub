import { Router } from 'express';
import { getCalendarEvents } from '../controllers/calendarController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/events', authMiddleware, getCalendarEvents);

export default router;
