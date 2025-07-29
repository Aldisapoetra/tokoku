const express = require('express')
const router = express.Router()
const Users = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

// REGISTER
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Semua field wajib diisi" })
  }

  try {
    const existing = await Users.findOne({ email })
    if (existing) return res.status(400).json({ message: "Email sudah digunakan" })

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new Users({ name, email, password: hashedPassword, role })
    await user.save()

    res.status(201).json({ message: "Registrasi berhasil" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await Users.findOne({ email })
    if (!user) return res.status(400).json({ message: "User tidak ditemukan" })

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return res.status(200).json({ message: "Password anda salah" })

    const token = jwt.sign({ id: user._id, name: user.name, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
    res.json({ token, user: { name: user.name, email: user.email, id: user._id, role: user.role } })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// DELETE ACCOUNT
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Users.findByIdAndDelete(id)

    if (!deleted) {
      return res.status(400).json({ message: "Akun tidak ditemukan" })
    }
    console.log('Success Delete')
    res.json({ message: "Berhasil menghapus akun" })
  } catch (err) {
    console.log('Error Auth Delete')
    res.status(500).json({ message: err.message })
  }
})

module.exports = router