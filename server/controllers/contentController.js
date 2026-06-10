import Content from '../models/Content.js';

export const getContent = async (req, res, next) => {
  try {
    const content = await Content.findOne();
    res.json(content || {});
  } catch (error) {
    next(error);
  }
};

export const updateContent = async (req, res, next) => {
  try {
    const data = req.body;
    const content = await Content.findOneAndUpdate({}, { ...data, updatedAt: new Date() }, { upsert: true, new: true });
    res.json(content);
  } catch (error) {
    next(error);
  }
};
