import express from 'express';
import {
  createArticle,
  deleteArticle,
  getAllArticles,
  getArticle,
  updateArticle
} from '../controllers/articleController.js';
import { protect } from '../controllers/authController.js';
const router = express.Router();

router.route('/').get(getAllArticles).post(protect, createArticle);
router
  .route('/:id')
  .get(getArticle)
  .delete(protect, deleteArticle)
  .patch(protect, updateArticle);

export default router;
