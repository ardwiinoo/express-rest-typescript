import { logger } from '../utils/logger'
import Product from '../models/product.model'
import ProductType from '../types/product.types'

export const addProductToDB = async (payload: ProductType) => {
  return await Product.create(payload)
}

export const getProductFromDB = async () => {
  return await Product.find()
    .then((data) => {
      return data
    })
    .catch((error) => {
      logger.info('Cannot get data from DB')
      logger.error(error)
    })
}

export const getProductById = async (id: string) => {
  return await Product.findOne({ product_id: id })
}

export const updateProductById = async (id: string, payload: ProductType) => {
  return await Product.findOneAndUpdate(
    {
      product_id: id
    },
    {
      $set: payload
    }
  )
}

export const deleteProductById = async (id: string) => {
  return await Product.findOneAndDelete({ product_id: id })
}
