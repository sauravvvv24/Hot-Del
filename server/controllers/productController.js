import Product from '../models/Product.js';

// Add a new product
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, image, stock } = req.body;

    // If you are using authentication middleware, seller info should come from req.user
    const seller = req.user ? req.user._id : null;

    if (!seller) {
      return res.status(401).json({ message: 'Unauthorized: No seller info' });
    }

    const product = new Product({
      name,
      description,
      price,
      image,
      stock,
      seller,
    });

    const savedProduct = await product.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    // Populate seller's name and email to include in response
    const products = await Product.find().populate('seller', 'name email');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update product by ID
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, image, stock } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, image, stock },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete product by ID
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
