import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { deleteMessage, getMessages } from '../controllers/contactController.js';

const router = express.Router();
router.get('/', authMiddleware, getMessages);
router.delete('/:id', authMiddleware, deleteMessage);

export default router;
