import cloudinary from '../config/cloudinary.js';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const localUploadDirectory = path.join(__dirname, '../uploads');
const imageExtensions = {
  'image/avif': '.avif',
  'image/gif': '.gif',
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
};

const uploadLocally = async (req, res) => {
  const extension = imageExtensions[req.file.mimetype];
  if (!extension) return res.status(400).json({ message: 'Use a JPG, PNG, GIF, WebP, or AVIF image' });
  await mkdir(localUploadDirectory, { recursive: true });
  const filename = `${randomUUID()}${extension}`;
  await writeFile(path.join(localUploadDirectory, filename), req.file.buffer);
  res.json({ url: `${req.protocol}://${req.get('host')}/uploads/${filename}` });
};

export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Image file is required' });
    if (process.env.NODE_ENV !== 'production') {
      await uploadLocally(req, res);
      return;
    }
    const uploadStream = cloudinary.uploader.upload_stream({ folder: 'portfolio' }, (error, result) => {
      if (error) return next(error);
      res.json({ url: result.secure_url });
    });
    uploadStream.end(req.file.buffer);
  } catch (error) {
    next(error);
  }
};
