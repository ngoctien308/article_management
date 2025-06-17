import db from '../db.js';

export const getAllCategories = async (req, res) => {
  try {
    const [categories, otherFields] = await db.query(
      'select * from categories'
    );
    res.status(200).json({ status: true, categories });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
