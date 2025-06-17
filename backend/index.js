import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import articleRouter from './routes/articleRouter.js';
import userRouter from './routes/userRouter.js';
import commentRouter from './routes/commentRouter.js';
import authRouter from './routes/authRoutes.js';

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use('/api/articles', articleRouter);
app.use('/api/users', userRouter);
app.use('/api/comments', commentRouter);
app.use('/api/auth', authRouter);

app.listen(3000, () => {
  console.log('Server đang chạy tại cổng 3000.');
});
