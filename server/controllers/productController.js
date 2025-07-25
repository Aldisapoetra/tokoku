const { json } = require("express")
const Product = require("../models/Product")

const getAllProducts = async (req, res) => {
  const products = await Product.find()
  res.json(products)
}

const getProductById = async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id)
  res.json(product)
}

const createProduct = async (req, res) => {
  try {
    const { name, price, description, image } = req.body;

    // Validasi sederhana (opsional tapi penting)
    if (!name || !price || !description || !image) {
      return res.status(400).json({ message: 'Semua field harus diisi.' });
    }

    const newProduct = new Product({
      name,
      price,
      description,
      image,
    });

    await newProduct.save();

    res.status(201).json(newProduct); // ✅ 201 = Created
    console.log(newProduct)
  } catch (err) {
    console.log(`Error: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Product.findByIdAndDelete(id)

    if (!deleted) {
      return res.status(404).json({ message: "Produk tidak ditemukan" })
    }
    res.json({ message: "Produk berhasil dihapus" })
  } catch (err) {
    res.status(500).json({ message: 'Proses gagal' })
  }
}


module.exports = { getAllProducts, getProductById, createProduct, deleteProductById }