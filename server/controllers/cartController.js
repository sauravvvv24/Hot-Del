// controllers/cartController.js
import Cart from '../models/cart.js';

export const addToCart = async (req, res) => {
  const { hotelId, productId } = req.body;

  try {
    let cart = await Cart.findOne({ hotelId });

    if (!cart) {
      cart = new Cart({ hotelId, items: [{ productId, quantity: 1 }] });
    } else {
      const item = cart.items.find(i => i.productId.toString() === productId);
      if (item) {
        item.quantity += 1;
      } else {
        cart.items.push({ productId, quantity: 1 });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add to cart' });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ hotelId: req.params.hotelId }).populate('items.productId');
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};

export const removeFromCart = async (req, res) => {
  const { hotelId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ hotelId });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove from cart' });
  }
};
