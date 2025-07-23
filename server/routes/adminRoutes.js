import express from 'express';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// ✅ Protected admin route
router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({ message: `Welcome, ${req.user.role}` });
});

export default router;
