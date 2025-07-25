const express = require('express')
const { getAllProducts, getProductById, createProduct, deleteProductById } = require('../controllers/productController')

const router = express.Router()

router.get('/', getAllProducts)
router.get('/:id', getProductById)
router.post('/', createProduct)
router.delete('/:id', deleteProductById)

module.exports = router