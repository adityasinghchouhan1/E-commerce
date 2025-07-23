const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    category: String,
    price: Number,
    offerPrice: Number,
    images: [String],
  },
  { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)
module.exports = Product
