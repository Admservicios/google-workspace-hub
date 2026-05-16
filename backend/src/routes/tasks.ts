import { Router } from 'express';
import { getTasks } from '../controllers/tasksController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/', authMiddleware, getTasks);

export default router;
