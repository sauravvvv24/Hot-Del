// controllers/orderController.js
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

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

export const getOrdersBySeller = async (req, res) => {
  try {
    // Find all products for this seller
    const sellerId = req.user.id || req.user._id;
    const sellerProducts = await Product.find({ seller: sellerId }, '_id');
    const productIds = sellerProducts.map(p => p._id);
    if (productIds.length === 0) {
      return res.status(200).json([]);
    }
    // Find all orders that contain at least one of these products
    const orders = await Order.find({ 'items.productId': { $in: productIds } })
      .populate('items.productId')
      .populate('hotelId');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch seller orders' });
  }
};
