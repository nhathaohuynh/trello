import mongoose, { Document, Schema, Types } from 'mongoose'

const DOCUMENT_NAME = 'card'
const COLECTION_NAME = 'cards'

export interface ICard extends Document {
  _id: Types.ObjectId
  boardId: Types.ObjectId
  columnId: Types.ObjectId
  title: string
  cover?: string
  memberIds: Types.ObjectId[]
  comments: string[]
  attachments: string[]
  _destroy: boolean
}

const Model: Schema = new Schema<ICard>(
  {
    boardId: {
      type: Schema.Types.ObjectId,
      required: true,
      validate: {
        validator: function (value: Types.ObjectId) {
          return Types.ObjectId.isValid(value)
        },
        message: 'Invalid ObjectId for boardId'
      },
      ref: 'board'
    },
    columnId: {
      type: Schema.Types.ObjectId,
      required: true,
      validate: {
        validator: function (value: Types.ObjectId) {
          return Types.ObjectId.isValid(value)
        },
        message: 'Invalid ObjectId for columnId'
      },
      ref: 'column'
    },
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 256,
      trim: true
    },

    cover: {
      type: String,
      default: null
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

    comments: {
      type: [String],
      default: []
    },

    attachments: {
      type: [String],
      default: []
    },

    _destroy: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true, // Auto-manage `createdAt` and `updatedAt`
    collection: COLECTION_NAME
  }
)

const CardModel = mongoose.model<ICard>(DOCUMENT_NAME, Model)
export default CardModel
