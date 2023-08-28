import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      unique: true
    },
    name: {
      type: String
    },
    price: {
      type: Number
    }
  },
  { timestamps: true }
)

const Product = mongoose.model('product', productSchema)

export default Product
