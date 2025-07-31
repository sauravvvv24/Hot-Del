// routes/authRoutes.js
import express from 'express';
import { hotelRegister, hotelLogin } from '../controllers/authController.js';

const router = express.Router();

router.post('/hotel-register', hotelRegister);
router.post('/hotel-login', hotelLogin);

export default router;
