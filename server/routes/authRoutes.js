const express = require('express')
const router = express.Router()
const Users = require('../models/User')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { verifyOtp, verifyToken } = require('../middleware/verify')
const sendOtpEmail = require('../utils/sendOtpEmail')
const { signAccessToken } = require('../utils/tokens')
const { cookieOpts } = require('../utils/cookies')

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
    const otpCode = crypto.randomInt(100000, 999999).toString()

    try {
      // Kirim email OTP
      await sendOtpEmail(email, "Verivikasi email Tokoku", `
      <h3>Halo ${name},</h3>
      <P>Ini adalah kode OTP kamu: <h1>${otpCode}</h1></p>
      <p>Kode ini berlaku selama 15 menit</p>
      `)
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }

    // Menyimpan user ke database
    const user = new Users({
      name,
      email,
      password: hashedPassword,
      role,
      otpCode,
      otpExpires: Date.now() + 1000 * 60 * 15  // 15 menit dari sekarang
    })
    await user.save()

    res.status(201).json({ message: "Registrasi berhasil, cek email untuk verifikasi OTP" })
  } catch (err) {
    res.status(500).json({ message: `${err.message} Holla` })
  }
})

// VERIFY OTP
router.post("/verify-otp", async (req, res) => {
  const { email, otpCode } = req.body

  try {
    const user = await Users.findOne({ email })
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" })

    if (user.isVerified) return res.status(202).json({ message: "Akun sudah diverifikasi" })

    if (otpCode !== user.otpCode || Date.now() > user.otpExpires) return res.status(400).json({ message: "OTP tidak valid atau kadaluarsa" })

    user.isVerified = true
    user.otpCode = null
    user.otpExpires = null
    await user.save()
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// RESEND OTP
router.post("/resend-otp", async (req, res) => {
  const { email } = req.body

  try {
    const user = await Users.findOne({ email })
    if (!user) return res.status(404).json({ message: "Email tidak ditemukan" })

    // generate otp baru
    const otpCode = crypto.randomInt(100000, 999999).toString()
    user.otpCode = otpCode
    user.otpExpires = Date.now() + 1000 * 60 * 15
    await user.save()

    // Kirim email OTP
    await sendOtpEmail(user.email, "Verifikasi Email Tokoku", `<h1>${otpCode}</h1>`)

    res.json({ message: "Kode OTP baru telah dikirim ke email kamu" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// LOGIN
router.post('/login', verifyOtp, async (req, res) => {
  console.log("1. Mulai login")
  const { email, password } = req.body

  try {
    const user = await Users.findOne({ email })
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" })

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return res.status(400).json({ message: "Password anda salah" })
    console.log("2. Password cocok")

    const accessToken = signAccessToken({ id: user._id, name: user.name, role: user.role })
    console.log("3. Token berhasil dibuat", accessToken)
    res.cookie("accessToken", accessToken, { ...cookieOpts, maxAge: 1000 * 60 * 30 })
    res.cookie("user", { id: user._id, name: user.name, email: user.email, role: user.role, isVerified: user.isVerified })
    console.log("4. Cookie berhasil dikirimkan")
    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role, isVerified: user.isVerified } })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// LOGOUT
router.post("/logout", (req, res) => {
  res.clearCookie("accessToken", { ...cookieOpts })
  res.clearCookie("user", { ...cookieOpts })
  res.json({ message: "Berhasil logout" })
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