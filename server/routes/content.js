import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { getContent, updateContent } from '../controllers/contentController.js';

const router = express.Router();
router.get('/', getContent);
router.put('/', authMiddleware, updateContent);

export default router;
