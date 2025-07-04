import db from '../db.js';

export const getAllUsers = async (req, res) => {
  try {
    const [users, otherFields] = await db.query(
      'SELECT * FROM users where role != "admin"'
    );
    res.status(200).json({ status: true, users });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
export const getUser = async (req, res) => {
  try {
    const [user, otherFields] = await db.query(
      'SELECT * FROM users where role != "admin" and id=?',
      [req.params.id]
    );
    res.status(200).json({ status: true, user });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const currentUserId = req.signedInUserId;
    const [user, otherFields] = await db.query(
      'SELECT * FROM users where id=?',
      [currentUserId]
    );

    res.status(200).json({ status: true, user });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const name = req.body?.name;
    const email = req.body?.email;
    const password = req.body?.password;

    // check trong
    if (!name || !email || !password) {
      throw new Error('Thiếu dữ liệu');
    }

    if (password.length < 6) {
      throw new Error('Mật khẩu phải từ 6 kí tự trở lên.');
    }

    // check trung
    const [data, others] = await db.query('select * from users where email=?', [
      email
    ]);

    if (data[0]) {
      throw new Error('Email đã tồn tại.');
    }

    await db.query('insert into users (name, email, password) values (?,?,?)', [
      name,
      email,
      password
    ]);

    res.status(200).json({
      status: true,
      message:
        'Đăng kí thành công. Bạn có thể đăng nhập.'
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const name = req.body?.name;
    const email = req.body?.email;
    const password = req.body?.password;

    if (!name || !email || !password) {
      throw new Error('Thiếu dữ liệu.');
    }

    if (password.length < 6) {
      throw new Error('Mật khẩu phải từ 6 kí tự trở lên.');
    }

    await db.query('update users set name=?,email=?,password=? where id=?', [
      name,
      email,
      password,
      req.params.id
    ]);

    res.status(200).json({ message: 'Sửa thành công.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await db.query('delete from users where id=?', [req.params?.id]);
    res.status(200).json({ message: 'Xóa thành công.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const changeStatus = async (req, res) => {
  try {
    await db.query('update users set active = NOT active where id = ?', [
      req.params.id
    ]);
    res.status(200).json({ message: 'Thay đổi trạng thái thành công.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
