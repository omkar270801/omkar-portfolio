import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { createProject, deleteProject, getProjects, initializeProjects, updateProject } from '../controllers/projectController.js';

const router = express.Router();
router.get('/', getProjects);
router.post('/initialize', authMiddleware, initializeProjects);
router.post('/', authMiddleware, createProject);
router.put('/:id', authMiddleware, updateProject);
router.delete('/:id', authMiddleware, deleteProject);

export default router;
