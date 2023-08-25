import { NextFunction, Request, Response, Router } from 'express'
import { logger } from '../utils/logger'
import { createProductValidation } from '../validation/product.validation'

export const ProductRouter: Router = Router()

ProductRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  logger.info('Success get data product')
  return res.status(200).send({
    error: false,
    message: 'Success post data product',
    data: req.body
  })
})

ProductRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
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
})
