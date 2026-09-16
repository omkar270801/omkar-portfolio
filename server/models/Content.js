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
<<<<<<< HEAD
  timeline: [{
    date: String,
    title: String,
    organization: String,
    details: String,
  }],
=======
>>>>>>> 87a19f2c47a81131568efa48f4f43f1e63c09003
  services: [{ title: String, description: String }],
  updatedAt: Date,
}, { timestamps: true });

const Content = mongoose.models.Content || mongoose.model('Content', contentSchema);
export default Content;
