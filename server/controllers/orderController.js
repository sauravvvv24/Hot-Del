// controllers/orderController.js
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';

export const placeOrder = async (req, res) => {
  const { hotelId } = req.body;

  try {
    const cart = await Cart.findOne({ hotelId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const order = new Order({
      hotelId,
      items: cart.items
    });

    await order.save();

    // Clear cart
    await Cart.findOneAndUpdate({ hotelId }, { items: [] });

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Order failed', error });
  }
};

export const getOrdersByHotel = async (req, res) => {
  const { hotelId } = req.params;

  try {
    const orders = await Order.find({ hotelId }).populate('items.productId');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};
