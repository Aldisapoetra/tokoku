const dotenv = require('dotenv')
dotenv.config()

const isProd = process.env.NODE_ENV === "production"

const cookieOpts = {
  httpOnly: true,
  secure: isProd,
  sameSite: "Lax"
}

module.exports = { cookieOpts }