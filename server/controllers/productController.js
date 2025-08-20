const { json } = require("express")
const Product = require("../models/Product")

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (err) {
    res.status(500).json({ message: "terjadi error" })
    console.log('error guys')
  }
}

const getProductById = async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id)
  res.json(product)
}

const createProduct = async (req, res) => {
  try {
    const { name, price, description, image, quantity } = req.body;

    // Validasi sederhana (opsional tapi penting)
    if (!name || !price || !description || !image || !quantity) {
      return res.status(401).
        json({ message: 'Semua field harus diisi.' })
    };

    const priceNumber = parseInt(price)
    if (isNaN(priceNumber) || price <= 0) {
      return res.status(500).json({ message: 'Harga produk harus angka positif.' })
    };


    const newProduct = new Product({
      name,
      price,
      description,
      image,
      quantity
    });

    await newProduct.save();

    res.status(201).json(newProduct); // ✅ 201 = Created
    console.log(newProduct)
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProductById = async (req, res) => {
  try {
    const { id } = req.params
    const { name, description, image, price, quantity } = req.body

    const priceNumber = parseInt(price)
    if (isNaN(priceNumber) || priceNumber <= 0) {
      return res.status(500).json({ message: "Harga produk harus angka positif" })
    }

    const product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        image,
        price,
        quantity
      },
      { new: true })

    if (!product) {
      return res.status(404).json({ message: "Produk tidak ditemukan" })
    }

    res.json({ message: "Produk berhasil diperbarui" })
  } catch (err) {
    res.status(500).json({ message: "Gagal memperbarui produk", error: err.message })
  }
}

const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Product.findByIdAndDelete(id)

    if (!deleted) {
      return res.status(404).json({ message: "Produk tidak ditemukan" })
    }
    res.json({ message: "Produk berhasil dihapus" })
  } catch (err) {
    res.status(500).json({ message: 'Terjadi kesalahan server' })
  }
}

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body


  } catch (err) {

  }
}


module.exports = { getAllProducts, getProductById, createProduct, updateProductById, deleteProductById }
