/* eslint-disable @typescript-eslint/no-explicit-any */
import { injectable } from 'inversify'
import { ObjectId } from 'mongodb'
import { dbInstance } from '~/databases/database-connection'
import {
  COLUMN_COLLECTION_NAME,
  COLUMN_COLLECTION_SCHEMA,
  COLUMN_UPDATE_SCHEMA,
  IColumn
} from '~/databases/models/column.model'
import { IRepository } from '~/interface/base/IRepository.base'
import { INVALID_UPDATE_FIELDS } from '~/utils/constant.util'

@injectable()
export class ColumnRepository implements IRepository<IColumn> {
  constructor() {}
  async find(query: Partial<IColumn>, page: number, limit: number) {
    // Implementation logic here...
    return { data: [], total: 0, page, limit }
  }

  async findOne(query: Partial<IColumn>) {
    const data = await dbInstance.getDatabase().collection(COLUMN_COLLECTION_NAME).findOne(query)
    if (!data) return null
    return data as IColumn
  }

  async findById(id: string | ObjectId) {
    const data = await dbInstance
      .getDatabase()
      .collection(COLUMN_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) })
    if (!data) return null
    return data as IColumn
  }

  async create(data: Partial<IColumn>) {
    const validData = await COLUMN_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })

    const result = await dbInstance
      .getDatabase()
      .collection(COLUMN_COLLECTION_NAME)
      .insertOne({
        ...validData,
        boardId: new ObjectId(validData.boardId)
      })
    return result.acknowledged ? result.insertedId : null
  }

  async findByIdAndUpdate(id: ObjectId | string, queryUpdate: any, options?: any) {
    const data = queryUpdate.$set | queryUpdate.$push | queryUpdate.$pull
    await COLUMN_UPDATE_SCHEMA.validateAsync(data, { abortEarly: false })

    Object.keys(data).forEach((key) => {
      if (INVALID_UPDATE_FIELDS.includes(key)) {
        delete queryUpdate.$set[key]
      }
    })

    const res = await dbInstance
      .getDatabase()
      .collection(COLUMN_COLLECTION_NAME)
      .findOneAndUpdate({ _id: new ObjectId(id) }, queryUpdate, options)
    return JSON.parse(JSON.stringify(res)) as IColumn // Example return
  }

  async findByIdAndDelete(id: ObjectId | string) {
    const res = await dbInstance
      .getDatabase()
      .collection(COLUMN_COLLECTION_NAME)
      .findOneAndDelete({ _id: new ObjectId(id) })
    return res?._id.toString() || null // Example return
  }
}
