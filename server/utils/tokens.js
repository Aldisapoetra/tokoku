const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const signAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
}

const signRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_REFRESH, { expiresIn: process.env.JWT_EXPIRES_REFRESH })
}

module.exports = { signAccessToken, signRefreshToken }