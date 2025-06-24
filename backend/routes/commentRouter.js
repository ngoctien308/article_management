import express from 'express';
import {
  createComment,
  deleteComment,
  getAllComments,
  getComment,
  updateComment
} from '../controllers/commentController.js';
import { protect } from '../controllers/authController.js';
const router = express.Router();

router
  .route('/:id')
  .get(getComment)
  .patch(protect, updateComment)
  .delete(protect, deleteComment);
router.route('/').get(getAllComments).post(protect, createComment);

export default router;
