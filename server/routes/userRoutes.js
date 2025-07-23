// routes/userRoutes.js
import express from 'express';
import User from '../models/User.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Example user route (e.g., get all users)
router.get('/', async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// Protected profile route
router.get('/profile', protect, async (req, res) => {
  try {
    // req.user is set in the protect middleware after verifying token
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
