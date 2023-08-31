import { NextFunction, Request, Response } from 'express'
import {
  addProductToDB,
  getProductById,
  getProductFromDB,
  updateProductById,
  deleteProductById
} from '../services/product.service'
import { logger } from '../utils/logger'
import { createProductValidation, updateProductValidation } from '../validations/product.validation'
import { v4 as uuidv4 } from 'uuid'

export const createProduct = async (req: Request, res: Response) => {
  req.body.product_id = uuidv4()

  const { error, value } = createProductValidation(req.body)
  if (error) {
    logger.error('ERR: product - create = ', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message, data: {} })
  }

  try {
    await addProductToDB(value)
    logger.info('Success add new product')
    return res.status(201).send({ status: true, statusCode: 201, message: 'Add product success', data: value })
  } catch (error) {
    logger.error('ERR: product - create = ', error)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}

export const getProduct = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  if (id) {
    const product: any = await getProductById(id)

    logger.info('Success get product data')
    return res.status(200).send({
      error: false,
      message: 'Success get product data',
      statusCode: 200,
      data: product
    })
  } else {
    const products: any = await getProductFromDB()

    logger.info('Success get product data')
    return res.status(200).send({
      error: false,
      message: 'Success get product data',
      statusCode: 200,
      data: products
    })
  }
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  const {
    params: { id }
  } = req

  const { error, value } = updateProductValidation(req.body)
  if (error) {
    logger.error('ERR: product - create = ', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message, data: {} })
  }

  try {
    await updateProductById(id, value)
    logger.info('Success update product')
    return res.status(200).send({ status: true, statusCode: 200, message: 'Update product success' })
  } catch (error) {
    logger.error('ERR: product - update = ', error)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  const {
    params: { id }
  } = req

  try {
    const result = await deleteProductById(id)

    if (result) {
      logger.info('Success delete product')
      return res.status(200).send({ status: true, statusCode: 200, message: 'Delete product success' })
    } else {
      logger.info('Failed delete product')
      return res.status(404).send({ status: true, statusCode: 404, message: 'Not found' })
    }
  } catch (error) {
    logger.error('ERR: product - delete = ', error)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}
