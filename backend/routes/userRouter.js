import express from 'express';
import {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  changeStatus
} from '../controllers/userController.js';
import { protect } from '../controllers/authController.js';
const router = express.Router();

router.patch('/:id/change-status', protect, changeStatus);
router
  .route('/:id')
  .get(getUser)
  .delete(protect, deleteUser)
  .patch(protect, updateUser);
router.route('/').get(getAllUsers).post(protect, createUser);

export default router;
