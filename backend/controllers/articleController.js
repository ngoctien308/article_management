import db from '../db.js';

export const getAllArticles = async (req, res) => {
  try {
    const [articles, otherFields] = await db.query(
      'SELECT articles.*, categories.name as categoryName, users.name as authorName, users.active as userActive FROM articles inner join categories on categories.id=articles.categoryId inner join users on users.id=articles.userId'
    );
    res.status(200).json({ status: true, articles });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const getArticle = async (req, res) => {
  try {
    const [article, otherFields] = await db.query(
      'SELECT articles.*, categories.name as categoryName, users.name as authorName, users.active as userActive FROM articles inner join categories on categories.id=articles.categoryId inner join users on users.id=articles.userId where articles.id = ?',
      [req.params?.id]
    );

    await db.query('update articles set views=? where id=?', [
      article[0].views + 1,
      req.params?.id
    ]);
    res.status(200).json({ status: true, article });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const createArticle = async (req, res) => {
  try {
    if (
      !req.body?.title ||
      !req.body?.content ||
      !req.body?.userId ||
      !req.body?.categoryId ||
      !req.body?.summary
    ) {
      throw new Error('Thiếu dữ liệu');
    }

    await db.query(
      'insert into articles (title,content,userId,categoryId,image,summary) values (?,?,?,?,?,?)',
      [
        req.body.title,
        req.body.content,
        req.body.userId,
        req.body.categoryId,
        req.body.image,
        req.body.summary
      ]
    );
    res.status(200).json({ status: true, message: 'Thêm thành công.' });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const title = req.body.title;
    const content = req.body.content;
    const categoryId = req.body.categoryId;
    const summary = req.body.summary;
    const image = req.body.image;

    if (!title || !content || !categoryId || !summary) {
      throw new Error('Thiếu dữ liệu.');
    }

    await db.query(
      'update articles set title=?,content=?,categoryId=?,summary=?,image=? where id=?',
      [title, content, categoryId, summary, image, req.params.id]
    );

    res.status(200).json({ status: true, message: 'Sửa thành công.' });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    await db.query('delete from articles where id=?', [req.params.id]);
    res.status(200).json({ status: true, message: 'Xóa thành công.' });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const getMyArticles = async (req, res) => {
  try {
    const [articles, otherFields] = await db.query(
      'SELECT articles.*, categories.name as categoryName, users.name as authorName FROM articles inner join categories on categories.id=articles.categoryId inner join users on users.id=articles.userId where userId=?',
      [req.signedInUserId]
    );
    res.status(200).json({ status: true, articles });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
