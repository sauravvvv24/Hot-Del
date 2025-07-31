// controllers/authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Hotel from '../models/Hotel.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// HOTEL REGISTER
export const hotelRegister = async (req, res) => {
  try {
    const { name, email, password, phone, address, type } = req.body;

    const existingHotel = await Hotel.findOne({ email });
    if (existingHotel) return res.status(400).json({ message: 'Hotel already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newHotel = new Hotel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      type,
    });

    await newHotel.save();

    const token = jwt.sign({ id: newHotel._id }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, hotel: newHotel });
  } catch (error) {
    console.error('Hotel Register Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// HOTEL LOGIN
export const hotelLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hotel = await Hotel.findOne({ email });
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

    const isMatch = await bcrypt.compare(password, hotel.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: hotel._id }, JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ token, hotel });
  } catch (error) {
    console.error('Hotel Login Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
