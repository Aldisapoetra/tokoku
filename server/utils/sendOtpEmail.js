const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
})

const sendOtpEmail = async (to, subject, html) => {
  try {
    return await transporter.sendMail({
      from: `"Tokoku" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    })
  } catch (err) {
    console.error("Gagal mengirim OTP:", err.message)
    throw new Error("Email tidak valid atau tidak aktif")
  }
}

module.exports = sendOtpEmail