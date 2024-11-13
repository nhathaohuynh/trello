import mongoose, { Document, ObjectId, Schema } from 'mongoose'
import { DEFAULT_AVATAR, ROLE } from '~/utils/constant.util'

const DOCUMENT_NAME = 'user'
const COLECTION_NAME = 'users'

export interface IUser extends Document {
  _id: ObjectId
  email: string
  password: string
  username: string
  avatar: string
  role?: Enumerator<typeof ROLE>
  phone: string
  address: string
  isActive: boolean
  verifyToken: string
  _destroy: boolean
}

export const USER_SELECT_FIELDS = ['_id', 'email', 'username', 'avatar', 'role', 'phone', 'address', 'isActive']

const UserSchema: Schema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      validate: {
        validator: function (email: string) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)
        },
        message: 'Invalid email address'
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      trim: true
    },
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 256,
      trim: true
    },
    avatar: {
      type: String,
      trim: true,
      default: DEFAULT_AVATAR
    },
    role: {
      type: String,
      enum: [ROLE.USER, ROLE.ADMIN],
      default: ROLE.USER
    },
    phone: {
      type: String,
      trim: true,
      default: null,
      match: /^[0-9]{10}$/
    },
    address: {
      type: String,
      trim: true,
      default: null
    },
    isActive: {
      type: Boolean,
      default: false
    },
    verifyToken: {
      type: String,
      required: true
    },
    _destroy: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    collection: COLECTION_NAME
  }
)

const UserModel = mongoose.model<IUser>(DOCUMENT_NAME, UserSchema)
export default UserModel
