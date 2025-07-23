import Order from '../models/Order.js';

export const placeOrder = async (req, res) => {
  try {
    const { items } = req.body;

    const order = new Order({
      userId: req.user.id,
      items,
      status: 'pending',
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Failed to place order' });
  }
};

export const getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get orders' });
  }
};
