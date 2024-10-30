import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/constant.util'

export interface IColumn extends Document {
  _id?: ObjectId
  boardId: ObjectId
  title: string
  cardOrderIds: ObjectId[]
  createdAt: Date
  updatedAt: Date | null
  _destroy: boolean
}

// Define Collection (name & schema)
const COLUMN_COLLECTION_NAME = 'Columns'
const COLUMN_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  title: Joi.string().required().min(3).max(50).trim().strict(),

  // Lưu ý các item trong mảng cardOrderIds là ObjectId nên cần thêm pattern cho chuẩn nhé, (lúc quay video số 57 mình quên nhưng sang đầu video số 58 sẽ có nhắc lại về cái này.)
  cardOrderIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

export const COLUMN_UPDATE_SCHEMA = Joi.object({
  title: Joi.string().min(3).max(50).trim().optional(),
  cardOrderIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).optional()
})

export { COLUMN_COLLECTION_NAME, COLUMN_COLLECTION_SCHEMA }