import jwt from 'jsonwebtoken';
import db from '../db.js';

export const signIn = async (req, res) => {
  try {
    const email = req.body?.email;
    const password = req.body?.password;

    // check trong
    if (!email || !password) {
      throw new Error('Thiếu dữ liệu');
    }

    const [data, others] = await db.query(
      'select * from users where email=? and password=?',
      [email, password]
    );

    if (data.length === 0) {
      throw new Error('Sai tài khoản hoặc mật khẩu.');
    }

    if (data[0].active == 0) {
      throw new Error('Tài khoản này chưa được kích hoạt hoạt động bởi Admin');
    }

    const signedInUser = data[0];
    const token = jwt.sign(
      { userId: signedInUser.id },
      process.env.SECRET_KEY,
      {
        // expiresIn: 300 // 5m
        expiresIn: '10m'
      }
    );

    res.status(200).json({
      message: 'Đăng nhập thành công.',
      token,
      role: signedInUser.role,
      status: true
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const protect = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token)
    return res.status(401).json({ message: 'Bạn phải đăng nhập trước.' });

  jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
    if (err) return res.status(403).json({ message: 'Token không hợp lệ.' });
    req.signedInUserId = data.userId;
    next();
  });
};
