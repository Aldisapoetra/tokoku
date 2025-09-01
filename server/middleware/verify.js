const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const Users = require('../models/User')

dotenv.config()

const verifyToken = (req, res, next) => {
  const token = req.cookies?.accessToken
  if (!token) return res.status(403).json({ message: "Token tidak disediakan" })

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decode
    next()
  } catch (err) {
    res.status(403).json({ message: "Token tidak valid, silakan login kembali" })
  }
}

const verifyAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Akses ditolak, anda bukan admin!" })
  }
  next()
}

const verifyOtp = async (req, res, next) => {
  try {
    const { email } = req.body
    if (!email) return res.status(400).json({ message: "Email tidak disediakan" })

    const user = await Users.findOne({ email })
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" })

    if (!user.isVerified) return res.status(403).json({ message: "Akun anda belum diverifikasi. Silakan Verifikasi email terlebih dahulu" })

    next()
  } catch (err) {
    res.status(500).json(err.message)
  }
}


module.exports = { verifyToken, verifyAdmin, verifyOtp }