const Product = require('../Modal/productModel')

// Add Product
const addProduct = async (req, res) => {
  console.log('Request Body:', req.body)
  console.log('Uploaded File:', req.files)
  try {
    const { name, description, category, discount, price, offerPrice } =
      req.body
    const images = req.files.map((file) => file.path)

    const product = new Product({
      name,
      description,
      category,
      price,
      offerPrice,
      images,
      discount,
    })

    await product.save()
    res.status(201).json({ success: true, product })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

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
    const { name, description, category, price, offerPrice, discount } =
      req.body

    // Prepare update object
    const updatedData = {
      name,
      description,
      category,
      price,
      offerPrice,
      discount,
    }

    // If new images are uploaded, replace old ones
    if (req.files && req.files.length > 0) {
      updatedData.images = req.files.map((file) => file.path)
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    )

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' })
    }

    res.status(200).json({ success: true, product: updatedProduct })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = {
  addProduct,
  getAllProducts,
  getProductbyid,
  getProductsByCategory,
  deleteProduct,
  updateProduct,
}
