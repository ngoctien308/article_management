import express from 'express';
import {
  createArticle,
  deleteArticle,
  getAllArticles,
  getArticle,
  getMyArticles,
  updateArticle
} from '../controllers/articleController.js';
import { protect } from '../controllers/authController.js';
const router = express.Router();

router.route('/myArticles').get(protect, getMyArticles);
router
  .route('/:id')
  .get(getArticle)
  .delete(protect, deleteArticle)
  .patch(protect, updateArticle);
router.route('/').get(getAllArticles).post(protect, createArticle);

export default router;
