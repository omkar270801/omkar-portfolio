import cloudinary from '../config/cloudinary.js';

export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Image file is required' });
    const uploadStream = cloudinary.uploader.upload_stream({ folder: 'portfolio' }, (error, result) => {
      if (error) return next(error);
      res.json({ url: result.secure_url });
    });
    uploadStream.end(req.file.buffer);
  } catch (error) {
    next(error);
  }
};
