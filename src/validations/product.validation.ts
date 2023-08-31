import Joi from 'joi'
import ProductType from '../types/product.types'

export const createProductValidation = (payload: ProductType) => {
  const schema = Joi.object({
    product_id: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().allow('', null)
  })

  return schema.validate(payload) // error atau value
}

export const updateProductValidation = (payload: ProductType) => {
  const schema = Joi.object({
    name: Joi.string().allow('', null),
    price: Joi.string().allow('', null)
  })

  return schema.validate(payload)
}
