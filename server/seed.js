import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import connectDB from './config/db.js';
import User from './models/User.js';
import Project from './models/Project.js';
import Content from './models/Content.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const sampleProjects = [
  {
    title: 'Launchpad CRM',
    description: 'A polished analytics and customer relationship dashboard with premium interactions and secure REST API integration.',
    features: ['Live charts', 'Role-based access', 'Modern dashboard UI'],
    tech: ['React', 'Tailwind', 'Express', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80',
    category: 'Full Stack',
    github: 'https://github.com/yourname/launchpad-crm',
    demo: 'https://demo.example.com',
  },
  {
    title: 'Premium Portfolio',
    description: 'A responsive developer portfolio built to impress recruiters with seamless animations and advanced UI.',
    features: ['Glassmorphism design', 'Interactive filters', 'Dark mode'],
    tech: ['React', 'Framer Motion', 'Vite', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1517430816045-df4b7de01a74?auto=format&fit=crop&w=1200&q=80',
    category: 'Frontend',
    github: 'https://github.com/yourname/premium-portfolio',
    demo: 'https://portfolio.example.com',
  },
];

const sampleContent = {
  hero: {
    title: 'Omar Hamdan',
    subtitle: 'Senior Full Stack Developer',
    tagline: 'Building premium digital products with modern interfaces, scalable APIs, and delightful UX.',
  },
  about: {
    summary: 'I design digital experiences that feel premium, fast, and polished. With a focus on clean interfaces, glassmorphism design, and reliable backend systems, I help brands stand out and scale.',
    goals: 'Deliver elegant full-stack solutions for fast-growing startups and forward-thinking enterprises.',
  },
  services: [
    { title: 'Web Development', description: 'Beautiful landing pages, SaaS dashboards, marketing sites, and dynamic interfaces.' },
    { title: 'Full Stack Apps', description: 'From wireframes to production deployments with backend APIs, auth, and state management.' },
  ],
};

const createSeed = async () => {
  await connectDB();

  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    console.error('Missing ADMIN_EMAIL or ADMIN_PASSWORD in server/.env. Please set the values before running the seed script.');
    process.exit(1);
  }

  const password = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
  await User.findOneAndUpdate(
    { role: 'admin' },
    { email: process.env.ADMIN_EMAIL, password, role: 'admin' },
    { upsert: true, new: true }
  );
  console.log('Admin user created or updated');

  await Project.deleteMany();
  await Project.insertMany(sampleProjects);
  console.log('Sample projects seeded');

  await Content.findOneAndUpdate({}, sampleContent, { upsert: true, new: true });
  console.log('Content seeded');

  process.exit();
};

createSeed().catch((error) => {
  console.error(error);
  process.exit(1);
});
