import { logger } from '../utils/logger'
import { createProductValidation } from '../validations/product.validation'
import { Request, Response } from 'express'

export const createProduct = (req: Request, res: Response) => {
  const { error, value } = createProductValidation(req.body)

  if (error) {
    logger.error(`[CREATE PRODUCT]: ${error.details[0].message}`)
    return res.status(422).send({
      error: true,
      message: error.details[0].message,
      data: {}
    })
  }

  logger.info('Success post data product')
  res.status(200).send({
    error: false,
    message: 'Success post data product',
    data: value
  })
}

export const getProduct = (req: Request, res: Response) => {
  // pura pura data
  let products = [
    { name: 'Sepatu', price: 20000 },
    { name: 'Laptop', price: 100000 }
  ]

  const {
    params: { name }
  } = req

  if (name) {
    products = products.filter((product) => product.name.toLowerCase() === name.toLowerCase())
  }

  logger.info('Success get data product')
  res.status(200).send({
    error: false,
    message: 'Success get data product',
    data: products
  })
}
