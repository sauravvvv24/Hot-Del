// routes/products.js

import express from 'express';
import {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';

const router = express.Router();

router.post('/', addProduct);
router.get('/', getAllProducts);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
