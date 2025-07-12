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

export const createCategory = async (req, res) => {
  try {
    if (!req.body.name) {
      throw new Error('Thiếu dữ liệu');
    }

    await db.query(
      'insert into categories (name) values (?)',
      [
        req.body.name
      ]
    );
    res.status(200).json({ status: true, message: 'Thêm thành công.' });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    if (!req.body.name) {
      throw new Error('Thiếu dữ liệu');
    }

    await db.query(
      'update categories set name=? where id=?',
      [
        req.body.name, req.params.id
      ]
    );
    res.status(200).json({ status: true, message: 'Sửa thành công.' });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    await db.query('delete from categories where id=?', [req.params.id]);
    res.status(200).json({ status: true, message: 'Xóa thành công.' });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
