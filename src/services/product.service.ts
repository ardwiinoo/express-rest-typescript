import { logger } from '../utils/logger'
import Product from '../models/product.model'

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
