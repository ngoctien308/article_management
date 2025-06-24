import express from 'express';
import {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser
} from '../controllers/userController.js';
import { protect } from '../controllers/authController.js';
const router = express.Router();

router.route('/').get(getAllUsers).post(protect, createUser);
router
  .route('/:id')
  .get(getUser)
  .delete(protect, deleteUser)
  .patch(protect, updateUser);

export default router;
