import express from 'express';
import { placeOrder, getOrdersByUser, getAllOrders } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', placeOrder);
router.get('/user/:id', getOrdersByUser);
router.get('/admin', getAllOrders); // for admin dashboard

export default router;
