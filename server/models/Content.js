import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  hero: {
    title: String,
    subtitle: String,
    tagline: String,
  },
  about: {
    summary: String,
    goals: String,
  },
  services: [{ title: String, description: String }],
  updatedAt: Date,
}, { timestamps: true });

const Content = mongoose.models.Content || mongoose.model('Content', contentSchema);
export default Content;
