import Joi from 'joi'
import { Document, ObjectId } from 'mongodb'
import { BOARD_TYPES, OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/constant.util'
import { BoardType } from '~/utils/type.util'

const BOARD_COLLECTION_NAME = 'Boards'

export interface IBoard extends Document {
  _id?: ObjectId
  title: string
  slug: string
  type: BoardType
  description: string
  columnOrderIds: ObjectId[]
  createdAt: Date
  updatedAt: Date | null
  _destroy: boolean
}

const BOARD_COLLECTION_SCHEMA = Joi.object<IBoard>({
  title: Joi.string().required().min(3).max(50).trim().strict(),

  slug: Joi.string().required().min(3).trim().strict(),

  description: Joi.string().required().min(3).max(256).trim().strict(),

  columnOrderIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).default([]),

  type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required(),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),

  updatedAt: Joi.date().timestamp('javascript').default(null),

  _destroy: Joi.boolean().default(false)
})

export const BOARD_UPDATE_SCHEMA = Joi.object<Partial<IBoard>>({
  title: Joi.string().min(3).max(50).trim().optional(),

  description: Joi.string().min(3).max(256).trim().optional(),

  columnOrderIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).optional(),

  type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).optional()
})

export { BOARD_COLLECTION_NAME, BOARD_COLLECTION_SCHEMA }
