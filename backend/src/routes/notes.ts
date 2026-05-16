import { Router } from 'express';
import { getNotes, createNote, deleteNote } from '../controllers/notesController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/', authMiddleware, getNotes);
router.post('/', authMiddleware, createNote);
router.delete('/:id', authMiddleware, deleteNote);

export default router;
