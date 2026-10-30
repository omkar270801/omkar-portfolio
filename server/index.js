import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import connectDB from './config/db.js';
import User from './models/User.js';
import authRoutes from './routes/auth.js';
import contactRoutes from './routes/contact.js';
import projectRoutes from './routes/projects.js';
import messageRoutes from './routes/messages.js';
import uploadRoutes from './routes/upload.js';
import contentRoutes from './routes/content.js';
import errorHandler from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 5001;

// Vercel sits behind a proxy; needed for rate limiting to see real IPs
app.set('trust proxy', 1);

const ensureAdminUser = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) {
    console.warn('ADMIN_EMAIL or ADMIN_PASSWORD is missing. Admin user will not be created automatically.');
    return;
  }

  const existingAdmin = await User.findOne({ email: adminEmail });
  if (existingAdmin) {
    return;
  }

  const password = await bcrypt.hash(adminPassword, 10);
  await User.create({ email: adminEmail, password, role: 'admin' });
  console.log('Admin user created automatically from environment variables.');
};

app.use(helmet());
const allowedOrigins = [
  process.env.CLIENT_ORIGIN,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  'http://omkarchandorkar-portfolio.local',
  'http://omkarchandorkar-portfolio.local:5174',
  'https://omkar-portfolio-murex.vercel.app',
].filter(Boolean);
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(rateLimit({ windowMs: 1000 * 60, max: 120 }));

// Connect to DB once per cold start (before routes handle requests)
let ready;
const init = () => {
  if (!ready) {
    ready = (async () => {
      await connectDB();
      await ensureAdminUser();
    })().catch((err) => {
      ready = null; // allow retry on next request
      throw err;
    });
  }
  return ready;
};

app.use(async (req, res, next) => {
  try {
    await init();
    next();
  } catch (err) {
    console.error('Init failed:', err);
    res.status(500).json({ message: 'Server initialization failed' });
  }
});

app.get('/health', (req, res) => res.json({ ok: true }));
app.get('/api/health', (req, res) => res.json({ ok: true }));

app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/content', contentRoutes);

app.use(errorHandler);

// Local development only
if (!process.env.VERCEL) {
  init()
    .then(() => {
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

export default app;