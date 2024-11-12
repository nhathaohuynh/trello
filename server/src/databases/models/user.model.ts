import Joi from 'joi'
import { Document, ObjectId } from 'mongodb'

const ROLE = {
  USER: 'user',
  ADMIN: 'admin'
}
export interface IUser extends Document {
  _id?: ObjectId
  email: string
  password: string
  username: string
  avatar?: string
  role?: string
  phone?: string
  address?: string
  isActive?: boolean
  verifyToken: string
  createdAt?: Date
  updatedAt?: Date | null
  _destroy?: boolean
}

export const USER_COLLECTION_NAME = 'Users'
export const USER_COLLECTION_SCHEMA = Joi.object<IUser>({
  email: Joi.string()
    .email()
    .required()
    .trim()
    .pattern(new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'))
    .message('Invalid email address'),
  password: Joi.string().required().min(8).trim(),
  username: Joi.string().required().min(3).max(50).trim(),
  avatar: Joi.string()
    .uri()
    .trim()
    .default(
      'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png'
    ),
  role: Joi.string().valid(ROLE.ADMIN, ROLE.ADMIN).default(ROLE.USER),
  phone: Joi.string().trim().default(null),
  address: Joi.string().trim().default(null),
  isActive: Joi.boolean().default(false),
  verifyToken: Joi.string(),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

export const USER_UPDATE_SCHEMA = Joi.object<Partial<IUser>>({
  username: Joi.string().min(3).max(50).trim().optional(),
  avatar: Joi.string().uri().trim().optional(),
  password: Joi.string().min(8).trim().optional(),
  phone: Joi.string().trim().length(10).optional(),
  address: Joi.string().trim().optional()
})

export const USER_SELECT_FIELDS = [
  '_id',
  'email',
  'username',
  'avatar',
  'role',
  'phone',
  'address',
  'isActive',
  'createdAt',
  'updatedAt'
]

export const INVALID_UPDATE_FIELDS_USER = ['_id', 'email', 'createdAt', 'username']
