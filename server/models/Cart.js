const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true
    },
    quantity: {
      type: Number,
      require: true,
      default: 1,
    }
  },
  {
    timestamps: true
  }
)

const Cart = new mongoose.model("Cart", cartSchema)

module.exports = Cart