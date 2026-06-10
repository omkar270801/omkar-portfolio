import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  features: [String],
  tech: [String],
  image: { type: String, required: true },
  category: { type: String, required: true },
  github: { type: String },
  demo: { type: String },
}, { timestamps: true });

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
export default Project;
