// server/controllers/authController.js
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Signup Controller
export const signupUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ email, password, role });

    res.status(201).json({
      message: 'Signup successful',
      token: generateToken(user),
    });
  } catch (err) {
    res.status(500).json({ message: 'Signup error', error: err.message });
  }
};

// Login Controller
export const loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (role && user.role !== role) {
      return res.status(403).json({ message: `User is not a ${role}` });
    }

    res.json({
      message: 'Login successful',
      token: generateToken(user),
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Login error', error: err.message });
  }
};
