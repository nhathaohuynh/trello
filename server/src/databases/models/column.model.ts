import mongoose, { Document, Schema, Types } from 'mongoose'

const DOCUMENT_NAME = 'column'
const COLECTION_NAME = 'columns'

export interface IColumn extends Document {
  _id: Types.ObjectId
  boardId: Types.ObjectId
  title: string
  cardOrderIds: Types.ObjectId[]
  cards: Types.ObjectId[]
  _destroy: boolean
}

const ColumnSchema: Schema = new Schema<IColumn>(
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
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 256,
      trim: true
    },
    cardOrderIds: {
      type: [Schema.Types.ObjectId],
      default: [],
      validate: {
        validator: function (value: Types.ObjectId[]) {
          return value.every((id) => Types.ObjectId.isValid(id))
        },
        message: 'Invalid ObjectId in cardOrderIds array'
      }
    },
    cards: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'card'
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

const ColumnModel = mongoose.model<IColumn>(DOCUMENT_NAME, ColumnSchema)
export default ColumnModel
