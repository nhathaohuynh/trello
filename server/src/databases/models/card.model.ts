import Joi from 'joi'
import { Document, ObjectId } from 'mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/constant.util'

export interface ICard extends Document {
  _id?: ObjectId
  boardId: ObjectId
  columnId: ObjectId
  title: string
  description?: string
  createdAt: Date
  updatedAt: Date | null
  _destroy: boolean
}

const CARD_COLLECTION_NAME = 'Cards'
const CARD_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  columnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  title: Joi.string().required().min(3).max(50).trim().strict(),
  description: Joi.string().optional(),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

export { CARD_COLLECTION_NAME, CARD_COLLECTION_SCHEMA }
