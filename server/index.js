const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const productRoutes = require('./routes/productRoutes')
const Auth = require('./routes/auth')

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/auth', Auth)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Database connected!')
    app.listen(5000)
  })
  .catch(err => console.log(`Error: ${err.message}`))