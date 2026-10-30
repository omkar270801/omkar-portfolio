import Project from '../models/Project.js';
import Content from '../models/Content.js';

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
    const { title, description, features, tech, image, category, github, demo, live } = req.body;
    const project = await Project.create({
      title,
      description,
      features: features || [],
      tech: tech || [],
      image,
      category,
      github,
      demo,
      live,
    });
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

export const initializeProjects = async (req, res, next) => {
  try {
    const content = await Content.findOne();
    if (content?.projectsInitialized) return res.json({ created: 0 });

    const defaults = Array.isArray(req.body.projects) ? req.body.projects : [];
    let created = 0;
    for (const { id, _id, ...project } of defaults) {
      if (!id || !project.title) continue;
      const existing = await Project.findOne({ $or: [{ key: id }, { title: project.title }] });
      if (existing) {
        if (!existing.key) {
          existing.key = id;
          await existing.save();
        }
        continue;
      }
      try {
        await Project.create({ ...project, key: id });
        created += 1;
      } catch (error) {
        if (error.code !== 11000) throw error;
      }
    }
    await Content.findOneAndUpdate({}, { projectsInitialized: true }, { upsert: true, new: true });
    res.json({ created });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const fields = ['title', 'description', 'features', 'tech', 'image', 'category', 'github', 'demo', 'live'];
    const updates = Object.fromEntries(fields
      .filter((field) => Object.hasOwn(req.body, field))
      .map((field) => [field, req.body[field]]));
    const project = await Project.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
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
