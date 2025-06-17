import express from 'express';
import {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser
} from '../controllers/userController.js';
import { protect } from '../controllers/authController.js';
const router = express.Router();

router.use(protect);
router.route('/').get(getAllUsers).post(protect, createUser);
router.route('/:id').delete(protect, deleteUser).patch(protect, updateUser);

export default router;
