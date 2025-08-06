const express = require('express')
const router = express.Router()
const { getAllProducts, getProductById, createProduct, deleteProductById } = require('../controllers/productController')
const { verifyToken, verifyAdmin } = require('../middleware/verify')


router.get('/', getAllProducts)
router.get('/:id', getProductById)
router.post('/', verifyToken, verifyAdmin, createProduct)
router.delete('/:id', verifyToken, verifyAdmin, deleteProductById)

module.exports = router