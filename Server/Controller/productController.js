const Product = require('../Modal/productModel')

// Add Product
const addProduct = async (req, res) => {
  console.log('Request Body:', req.body)
  console.log('Uploaded File:', req.files)
  try {
    const { name, description, category, price, offerPrice } = req.body
    const images = req.files.map((file) => file.path)

    const product = new Product({
      name,
      description,
      category,
      price,
      offerPrice,
      images,
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
    const products = await Product.find({ category: req.params.category })
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
    const { name, description, category, price, offerPrice } = req.body
    const images = req.files?.length
      ? req.files.map((file) => file.path)
      : undefined

    const updatedData = { name, description, category, price, offerPrice }
    if (images) updatedData.images = images

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    )

    res.status(200).json({ success: true, product })
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
