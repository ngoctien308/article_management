import db from '../db.js';

export const getAllComments = async (req, res) => {
  try {
    let data;
    const articleId = req.query.articleId;
    if (articleId) {
      const [data1, otherFields] = await db.query(
        'SELECT comments.*, users.name as userName FROM comments inner join users on users.id=comments.userId where articleId = ?',
        [articleId]
      );
      data = data1;
    } else {
      const [data2, otherFields] = await db.query(
        'SELECT comments.*, users.name as userName from comments inner join users on users.id=comments.userId'
      );
      data = data2;
    }

    res.status(200).json({ status: true, row: data.length, comments: data });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const getComment = async (req, res) => {
  try {
    if (!req.params?.id) {
      throw new Error('Thiếu dữ liệu');
    }

    const [comment, otherFields] = await db.query(
      'SELECT * FROM comments where id = ?',
      [req.params.id]
    );

    res.status(200).json({ status: true, comment });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const createComment = async (req, res) => {
  try {
    if (!req.body?.userId || !req.body?.articleId || !req.body?.content) {
      throw new Error('Thiếu dữ liệu');
    }

    await db.query(
      'insert into comments (userId, articleId, content) values (?,?,?)',
      [req.body.userId, req.body.articleId, req.body.content]
    );

    res.status(200).json({ status: true, message: 'Thêm thành công.' });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    if (!req.params?.id) {
      throw new Error('Thiếu dữ liệu');
    }

    await db.query('delete from comments where id=?', [req.params.id]);

    res.status(200).json({ status: true, message: 'Xóa thành công.' });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    if (!req.params?.id || !req.body?.content) {
      throw new Error('Thiếu dữ liệu');
    }

    await db.query('update comments set content=? where id=?', [
      req.body.content,
      req.params.id
    ]);

    res.status(200).json({ status: true, message: 'Cập nhật thành công.' });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
