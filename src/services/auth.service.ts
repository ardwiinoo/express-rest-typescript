import UserType from '../types/user.types'
import User from '../models/user.model'

export const createUser = async (payload: UserType) => {
  return await User.create(payload)
}
