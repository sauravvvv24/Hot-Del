import express from 'express';
import { placeOrder, getOrdersByUser } from '../controllers/orderController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// POST /api/orders — place a new order
router.post('/', authMiddleware, placeOrder);

// GET /api/orders — get orders for the logged-in user
router.get('/', authMiddleware, getOrdersByUser);

export default router;
