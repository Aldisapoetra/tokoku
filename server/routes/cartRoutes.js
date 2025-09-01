const express = require("express")
const Product = require("../models/Product")
const Cart = require("../models/Cart")
const { verifyToken } = require("../middleware/verify")
const router = express.Router()

// Menambahkan produk ke cart
router.post("/", verifyToken, async (req, res) => {
  try {
    const { productId, quantity } = req.body
    console.log(productId, quantity)

    // pengecekan produk di database produk
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ message: "Produk tidak ditemukan" })
    }

    // pengecekan produk di database cart 
    const existingItem = await Cart.findOne({
      user: req.user.id,
      product: productId
    })

    // Jika produk sudah ada di database cart, tinggal tambahkan quantity 
    if (existingItem) {
      existingItem.quantity += quantity
      await existingItem.save()
      return res.json({ message: "Quantity diperbarui", cart: existingItem })
    }

    // Jika produk belum ada di cart user, tambahkan produk ke cart user
    const newCartItem = new Cart({
      user: req.user.id,
      product,
      quantity
    })

    await newCartItem.save()
    res.status(201)
    // res.cookie("accessToken", )
    res.json({ message: "Produk ditambahkan ke cart", cart: newCartItem })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Terjadi kesalahan server" })
  }
})

// Ambil isi cart user
router.get("/", verifyToken, async (req, res) => {
  try {
    const cartItems = await Cart.find({ user: req.user.id }).populate("product", "name price image")

    // Format cart
    const formattedCart = cartItems.map(item => ({
      id: item._id,
      name: item.product.name,
      price: item.product.price,
      image: item.product.image,
      quantity: item.quantity,
      totalPrice: item.product.price * item.quantity
    }))

    res.status(200).json(formattedCart)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Terjadi kesalahan server" })
  }
})

// Hapus item di cart
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params
    const deletedItem = await Cart.findByIdAndDelete(id)

    console.log(id)

    if (!deletedItem) {
      return res.status(404).json({ message: "Produk tidak ditemukan" })
    }

    res.status(200).json({ message: "Berhasil menghapus item" })
  } catch (err) {
    res.status(500).json({ message: "Terjadi kesalahan server" })
  }
})

// Mengubah kuantitas item di cart
router.patch("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params
    const { quantity } = req.body
    const item = await Cart.findByIdAndUpdate(id, { $inc: { quantity } }, { new: true })
    console.log(item)

    if (!item) {
      return res.status(404).json({ message: "Produk tidak ditemukan" })
    }
    res.status(200).json({ message: "berhasil mengubah kuantitas" })
  } catch (err) {
    res.status(500).json({ message: "Gagal mengubah kuantitas", error: err.message })
  }
})



module.exports = router