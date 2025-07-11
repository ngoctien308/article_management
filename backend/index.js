import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import articleRouter from './routes/articleRouter.js';
import userRouter from './routes/userRouter.js';
import commentRouter from './routes/commentRouter.js';
import authRouter from './routes/authRouter.js';
import categoryRouter from './routes/categoryRouter.js';
import multer from 'multer';

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads')); // Cho phép truy cập ảnh tĩnh

// Cấu hình Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Lưu vào thư mục uploads
  },
  filename: (req, file, cb) => {
    // Đặt tên file duy nhất (timestamp + tên gốc)
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Không có file' });
  }

  const fileUrl = `http://localhost:3000/uploads/${req.file.filename}`;
  res.json({
    message: 'Upload thành công',
    url: fileUrl
  });
});

// routes
app.use('/api/articles', articleRouter);
app.use('/api/users', userRouter);
app.use('/api/comments', commentRouter);
app.use('/api/auth', authRouter);
app.use('/api/categories', categoryRouter);

app.listen(3000, () => {
  console.log('Server đang chạy tại cổng 3000.');
});
