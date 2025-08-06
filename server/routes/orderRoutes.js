// routes/orderRoutes.js
import express from 'express';
import { placeOrder, getOrdersByHotel, getOrdersBySeller } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/place', placeOrder);              // POST: Place an order
router.get('/:hotelId', getOrdersByHotel);      // GET: Hotel's past orders
router.get('/seller', protect, getOrdersBySeller); // GET: Seller's orders

export default router;
