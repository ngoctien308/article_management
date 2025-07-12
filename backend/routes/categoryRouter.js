import express from 'express';
import { getAllCategories, createCategory, updateCategory, deleteCategory } from '../controllers/categoryController.js';
const router = express.Router();

router.route('/').get(getAllCategories).post(createCategory);
router.route('/:id').patch(updateCategory).delete(deleteCategory);

export default router;
