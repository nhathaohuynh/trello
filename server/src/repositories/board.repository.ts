/* eslint-disable @typescript-eslint/no-explicit-any */
import { injectable } from 'inversify'
import { ObjectId } from 'mongodb'
import { dbInstance } from '~/databases/database-connection'
import { BOARD_COLLECTION_NAME, BOARD_COLLECTION_SCHEMA, IBoard } from '~/databases/models/board.model'
import { CARD_COLLECTION_NAME } from '~/databases/models/card.model'
import { COLUMN_COLLECTION_NAME } from '~/databases/models/column.model'
import { IRepository } from '~/interface/base/IRepository.base'
import { INVALID_UPDATE_FIELDS } from '~/utils/constant.util'

@injectable()
export class BoardRepository implements IRepository<IBoard> {
  constructor() {}
  async find(query: Partial<IBoard>, page: number, limit: number) {
    return { data: [], total: 0, page, limit }
  }

  async findOne(query: Partial<IBoard>) {
    const data = await dbInstance.getDatabase().collection(BOARD_COLLECTION_NAME).findOne(query)
    if (!data) return null
    return data as IBoard
  }

  async findById(id: string | ObjectId) {
    const data = await dbInstance
      .getDatabase()
      .collection(BOARD_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) })
    if (!data) return null
    return data as IBoard
  }

  async findByIdAndLookup(id: string | ObjectId) {
    const result = await dbInstance
      .getDatabase()
      .collection(BOARD_COLLECTION_NAME)
      .aggregate([
        { $match: { _id: new ObjectId(id), _destroy: false } },
        {
          $lookup: {
            from: COLUMN_COLLECTION_NAME,
            localField: '_id',
            foreignField: 'boardId',
            as: 'columns'
          }
        },
        {
          $lookup: {
            from: CARD_COLLECTION_NAME,
            localField: '_id',
            foreignField: 'boardId',
            as: 'cards'
          }
        }
      ])
      .toArray()

    return result[0] || null
  }

  async create(data: Partial<IBoard>) {
    const validData = await BOARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })

    console.log(validData)

    const result = await dbInstance.getDatabase().collection(BOARD_COLLECTION_NAME).insertOne(validData)
    return result.acknowledged ? result.insertedId : null
  }

  async findByIdAndUpdate(id: ObjectId | string, queryUpdate: any, options?: any) {
    const data = queryUpdate.$set | queryUpdate.$push | queryUpdate.$pull

    Object.keys(data).forEach((key) => {
      if (INVALID_UPDATE_FIELDS.includes(key)) {
        delete queryUpdate.$set[key]
      }
    })

    const res = await dbInstance
      .getDatabase()
      .collection(BOARD_COLLECTION_NAME)
      .findOneAndUpdate({ _id: new ObjectId(id) }, queryUpdate, options)

    return JSON.parse(JSON.stringify(res)) as IBoard
  }

  async findByIdAndDelete(id: ObjectId | string) {
    const res = await dbInstance
      .getDatabase()
      .collection(BOARD_COLLECTION_NAME)
      .findOneAndDelete({ _id: new ObjectId(id) })
    return res?._id.toString() || null
  }
}
