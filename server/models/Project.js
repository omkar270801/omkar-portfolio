import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  key: { type: String, unique: true, sparse: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  features: [String],
  tech: [String],
  image: { type: String, required: true },
  category: { type: String, required: true },
  github: { type: String },
  demo: { type: String },
  live: { type: String },
}, { timestamps: true });

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
export default Project;
