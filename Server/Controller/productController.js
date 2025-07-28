const Product = require('../Modal/productModel')


// Add Product
const addProduct = async (req, res) => {
  try {
    const { name, description, category, price, offerPrice, discount } = req.body;

    const images = req.files.images ? req.files.images.map(file => file.path) : [];
    const video = req.files.video && req.files.video[0] ? req.files.video[0].path : '';

    const product = new Product({
      name,
      description,
      category,
      price,
      offerPrice,
      discount,
      images,
      video,
    });

    await product.save();
    res.status(201).json({ success: true, product });
  } catch (error) {
    console.error('Add product error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// In your backend route file
//
const getProductbyid = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    res.status(200).json({ success: true, product })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Get All Products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json({ success: true, products })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Get by Category
const getProductsByCategory = async (req, res) => {
  try {
    let products

    if (req.params.category === 'category') {
      products = await Product.find() // no filter
    } else {
      products = await Product.find({ category: req.params.category })
    }

    res.status(200).json({ success: true, products })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.status(200).json({ success: true, message: 'Product deleted' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Update Product
const updateProduct = async (req, res) => {
  try {
    const { name, description, category, price, offerPrice, discount } = req.body;

    const updatedFields = {
      name,
      description,
      category,
      price,
      offerPrice,
      discount,
    };

    if (req.files.images) {
      updatedFields.images = req.files.images.map(file => file.path);
    }

    if (req.files.video && req.files.video[0]) {
      updatedFields.video = req.files.video[0].path;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updatedFields, { new: true });

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductbyid,
  getProductsByCategory,
  deleteProduct,
  updateProduct,
}
