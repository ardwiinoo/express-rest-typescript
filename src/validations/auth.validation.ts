import Joi from 'joi'
import UserType from './../types/user.types'

export const createUserValidation = (payload: UserType) => {
  const schema = Joi.object({
    user_id: Joi.string().required(),
    email: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.allow().allow('', null)
  })

  return schema.validate(payload)
}

export const createSessionValidation = (payload: UserType) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
  })

  return schema.validate(payload)
}

export const createRefreshSessionValidation = (payload: UserType) => {
  const schema = Joi.object({
    refreshToken: Joi.string().required()
  })

  return schema.validate(payload)
}
