const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
  quantity: Number
})

const Product = new mongoose.model("Product", productSchema)

module.exports = Product