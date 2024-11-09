import Joi from 'joi'
import { Document } from 'mongodb'

const ROLE = {
  USER: 'user',
  ADMIN: 'admin'
}
export interface IUser extends Document {
  _id?: string
  email: string
  password: string
  username: string
  displayName: string
  avatar: string
  role: string
  isActive: boolean
  verifyToken: string
  createdAt: Date
  updatedAt: Date | null
  _destroy: boolean
}

export const USER_COLLECTION_NAME = 'Users'
export const USER_COLLECTION_SCHEMA = Joi.object<IUser>({
  email: Joi.string()
    .email()
    .required()
    .trim()
    .pattern(new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'))
    .strict()
    .message('Invalid email address'),
  password: Joi.string().required().min(8).max(20).trim().strict(),
  username: Joi.string().required().min(6).max(20).trim().strict(),
  displayName: Joi.string().required().min(6).max(50).trim().strict(),
  avatar: Joi.string().uri().trim().default(null),
  role: Joi.string().valid(ROLE.ADMIN, ROLE.ADMIN).default(ROLE.USER),
  isActive: Joi.boolean().default(false),
  verifyToken: Joi.string(),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

export const INVALID_UPDATE_FIELDS_USER = ['_id', 'email', 'createdAt', 'username']
