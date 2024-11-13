import mongoose, { Document, Schema, Types } from 'mongoose'
import { BOARD_TYPES } from '~/utils/constant.util'

const DOCUMENT_NAME = 'board'
const COLECTION_NAME = 'boards'

export interface IBoard extends Document {
  _id: Types.ObjectId
  title: string
  slug: string
  type: Enumerator<typeof BOARD_TYPES>
  cover?: string
  description: string
  ownerIds: Types.ObjectId[]
  memberIds?: Types.ObjectId[]
  columnOrderIds?: Types.ObjectId[]
  columns: Types.ObjectId[]
  _destroy?: boolean
}

const Model: Schema = new Schema<IBoard>(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 256,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      minlength: 3,
      trim: true
    },
    type: {
      type: String,
      enum: [BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE],
      required: true
    },
    description: {
      type: String,
      required: true,
      minlength: 3,
      trim: true
    },
    cover: {
      type: String,
      default: null
    },
    ownerIds: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'user'
        }
      ],
      required: true
    },
    memberIds: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'user'
        }
      ],
      default: []
    },
    columnOrderIds: {
      type: [Schema.Types.ObjectId],
      default: []
    },
    columns: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'column'
        }
      ],
      default: []
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

const BoardModel = mongoose.model<IBoard>(DOCUMENT_NAME, Model)
export default BoardModel
