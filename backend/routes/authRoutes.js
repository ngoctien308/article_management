import express from 'express';
import { signIn } from '../controllers/authController.js';
import { createUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/signin', signIn);
router.post('/signup', createUser);

export default router;
