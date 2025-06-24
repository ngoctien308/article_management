import express from 'express';
import { protect, signIn } from '../controllers/authController.js';
import { createUser, getCurrentUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/signin', signIn);
router.post('/signup', createUser);
router.get('/info', protect, getCurrentUser);

export default router;
