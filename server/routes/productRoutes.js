const express = require('express')
const { getAllProducts, getProductById, createProduct, deleteProductById } = require('../controllers/productController')
const { verifyToken, verifyAdmin } = require('../middleware/verify')

const router = express.Router()

router.get('/', getAllProducts)
router.get('/:id', getProductById)
router.post('/', verifyToken, verifyAdmin, createProduct)
router.delete('/:id', verifyToken, verifyAdmin, deleteProductById)

module.exports = router