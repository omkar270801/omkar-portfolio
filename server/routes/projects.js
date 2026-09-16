import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { createProject, deleteProject, getProjects } from '../controllers/projectController.js';

const router = express.Router();
router.get('/', getProjects);
router.post('/', authMiddleware, createProject);
router.delete('/:id', authMiddleware, deleteProject);

export default router;
