import Project from '../models/Project.js';

export const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const { title, description, features, tech, image, category, github, demo } = req.body;
    const project = await Project.create({
      title,
      description,
      features: features || [],
      tech: tech || [],
      image,
      category,
      github,
      demo,
    });
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (error) {
    next(error);
  }
};
