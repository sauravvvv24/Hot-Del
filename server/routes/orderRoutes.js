// routes/orderRoutes.js
import express from 'express';
import { placeOrder, getOrdersByHotel } from '../controllers/orderController.js';

const router = express.Router();

router.post('/place', placeOrder);              // POST: Place an order
router.get('/:hotelId', getOrdersByHotel);      // GET: Hotel's past orders

export default router;
