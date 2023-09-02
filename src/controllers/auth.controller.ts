import { NextFunction, Request, Response } from 'express'
import {
  createRefreshSessionValidation,
  createSessionValidation,
  createUserValidation
} from './../validations/auth.validation'
import { v4 as uuidv4 } from 'uuid'
import { logger } from '../utils/logger'
import { checkPassword, hashing } from '../utils/hashing'
import { createUser, getUserByEmail } from './../services/auth.service'
import { signJWT, verifyJWT } from '../utils/jwt'

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  req.body.user_id = uuidv4()
  const { error, value } = createUserValidation(req.body)

  if (error) {
    logger.error('ERR: auth - create = ', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message, data: {} })
  }

  try {
    value.password = `${hashing(value.password)}`
    await createUser(value)
    return res.status(201).json({
      status: true,
      statusCode: 201,
      message: 'Success register user'
    })
  } catch (error) {
    logger.error('ERR: auth - create = ', error)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}

export const createSession = async (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = createSessionValidation(req.body)

  if (error) {
    logger.error('ERR: auth - create session = ', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  }

  try {
    const user: any = await getUserByEmail(value.email)

    const isValid: Boolean = checkPassword(value.password, user.password)

    if (!isValid) {
      return res.status(401).json({
        status: false,
        statusCode: 401,
        message: 'Invalid email or password'
      })
    }

    const accessToken = signJWT({ ...user }, { expiresIn: '30m' })

    const refreshToken = signJWT({ ...user }, { expiresIn: '1d' })

    return res.status(200).send({
      status: true,
      statusCode: 200,
      message: 'Login success',
      data: {
        accessToken,
        refreshToken
      }
    })
  } catch (error: any) {
    logger.error('ERR: auth - create session = ', error.message)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}

export const refreshSession = async (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = createRefreshSessionValidation(req.body)

  if (error) {
    logger.error('ERR: auth - refresh session = ', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  }

  try {
    const { decoded } = verifyJWT(value.refreshToken)

    const user = await getUserByEmail(decoded._doc.email)
    if (!user) return false

    const accessToken = signJWT(
      {
        ...user
      },
      { expiresIn: '30m' }
    )

    return res.status(200).send({
      status: true,
      statusCode: 200,
      message: 'Refresh session success',
      data: { accessToken }
    })
  } catch (error: any) {
    logger.error('ERR: auth - refresh session = ', error.message)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}
