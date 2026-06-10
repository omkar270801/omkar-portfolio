import express from 'express';
import authMiddleware from '../middleware/auth.js';
import uploadMiddleware from '../middleware/upload.js';
import { uploadImage } from '../controllers/uploadController.js';

const router = express.Router();
router.post('/', authMiddleware, uploadMiddleware.single('image'), uploadImage);

export default router;
