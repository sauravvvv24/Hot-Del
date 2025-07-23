import express from 'express';
import {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public: Get all products
router.get('/', getAllProducts);

// Protected routes (require login)
router.post('/', protect, addProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

export default router;
