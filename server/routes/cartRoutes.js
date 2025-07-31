// routes/cartRoutes.js
import express from 'express';
import {
  addToCart,
  getCart,
  removeFromCart,
} from '../controllers/cartController.js';

const router = express.Router();

router.post('/add', addToCart);
router.get('/:hotelId', getCart);
router.delete('/remove', removeFromCart);

export default router;
