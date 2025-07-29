const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(403).json({ message: "No token provided" })

  const token = authHeader.split(" ")[1]
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decode
    console.log(`verifyToken req.user: ${JSON.stringify(req.user)}`)
    next()
  } catch (err) {
    res.status(403).json({ message: "Invalid token" })
  }
}

const verifyAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admin only" })
  }
  next()
}



module.exports = { verifyToken, verifyAdmin }