// controllers/authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import HotelModel from '../models/Hotel.js';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// HOTEL REGISTER
export const hotelRegister = async (req, res) => {
  try {
    const { name, email, password, phone, address, type } = req.body;

    const existingHotel = await HotelModel.findOne({ email });
    if (existingHotel) return res.status(400).json({ message: 'Hotel already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newHotel = await HotelModel.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      type,
    });

    

    const token = jwt.sign({ id: newHotel._id, role: 'hotel' }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, hotel: newHotel });
  } catch (error) {
    console.error('Hotel Register Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};


export const hotelLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hotel = await HotelModel.findOne({ email });
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

    const isMatch = await bcrypt.compare(password, hotel.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: hotel._id, role: 'hotel' }, JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ token, hotel });
  } catch (error) {
    console.error('Hotel Login Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// SELLER REGISTER
export const sellerRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email, role: 'seller' });
    if (existingUser) {
      return res.status(400).json({ message: 'Seller with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newSeller = new User({
      name,
      email,
      password: hashedPassword,
      role: 'seller'
    });

    await newSeller.save();

    const token = jwt.sign({ id: newSeller._id, role: 'seller' }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ 
      message: 'Seller registered successfully',
      token,
      user: {
        _id: newSeller._id,
        name: newSeller.name,
        email: newSeller.email,
        role: newSeller.role
      }
    });
  } catch (error) {
    console.error('Seller Register Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// SELLER LOGIN
export const sellerLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find seller by email
    const seller = await User.findOne({ email });
    if (!seller) return res.status(404).json({ message: 'Seller not found' });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign(
      { id: seller._id, role: 'seller' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Send response
    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        _id: seller._id,
        name: seller.name,
        email: seller.email,
        role: seller.role,
      },
    });
  } catch (error) {
    console.error('Seller Login Error:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};