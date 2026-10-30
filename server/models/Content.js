import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  hero: mongoose.Schema.Types.Mixed,
  about: mongoose.Schema.Types.Mixed,
  skillCategories: mongoose.Schema.Types.Mixed,
  sectionHeadings: mongoose.Schema.Types.Mixed,
  navLinks: mongoose.Schema.Types.Mixed,
  timeline: [{
    date: String,
    title: String,
    organization: String,
    details: String,
  }],
  achievements: [{
    year: String,
    title: String,
    organization: String,
    details: String,
  }],
  services: mongoose.Schema.Types.Mixed,
  contact: mongoose.Schema.Types.Mixed,
  footer: mongoose.Schema.Types.Mixed,
  projectsInitialized: Boolean,
  updatedAt: Date,
}, { timestamps: true });

const Content = mongoose.models.Content || mongoose.model('Content', contentSchema);
export default Content;
