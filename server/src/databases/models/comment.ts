import { Document, model, Schema } from 'mongoose'

const COLLECTION_NAME = 'comments'
const DOCUMENT_NAME = 'comment'

export interface IComment extends Document {
  _id: Schema.Types.ObjectId
  content: string
  cardId: Schema.Types.ObjectId
  user: Schema.Types.ObjectId
  parent: Schema.Types.ObjectId
}

const commentSchema = new Schema<IComment>(
  {
    content: {
      type: String,
      required: true,
      index: true
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },

    cardId: {
      type: Schema.Types.ObjectId,
      index: true,
      required: true
    },

    parent: {
      type: Schema.Types.ObjectId,
      ref: 'comment',
      default: null
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

const commentModel = model<IComment>(DOCUMENT_NAME, commentSchema)

export const CommentModel = commentModel
