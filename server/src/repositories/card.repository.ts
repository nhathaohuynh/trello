/* eslint-disable @typescript-eslint/no-explicit-any */
import { injectable } from 'inversify'
import { ObjectId } from 'mongodb'
import { dbInstance } from '~/databases/database-connection'
import { CARD_COLLECTION_NAME, CARD_COLLECTION_SCHEMA } from '~/databases/models/card.model'

import { ICard } from '~/databases/models/card.model'
import { IRepository } from '~/interface/base/IRepository.base'

@injectable()
export class CardRepository implements IRepository<ICard> {
  constructor() {}
  async find(query: Partial<ICard>, page: number, limit: number) {
    // Implementation logic here...
    return { data: [], total: 0, page, limit }
  }

  async findOne(query: Partial<ICard>) {
    const data = await dbInstance.getDatabase().collection(CARD_COLLECTION_NAME).findOne(query)
    if (!data) return null
    return data as ICard
  }

  async findById(id: string | ObjectId) {
    const data = await dbInstance
      .getDatabase()
      .collection(CARD_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) })
    if (!data) return null
    return data as ICard
  }

  async create(data: Partial<ICard>) {
    const validData = await CARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })

    const result = await dbInstance
      .getDatabase()
      .collection(CARD_COLLECTION_NAME)
      .insertOne({
        ...validData,
        columnId: new ObjectId(validData.columnId),
        boardId: new ObjectId(validData.boardId)
      })
    return result.acknowledged ? result.insertedId : null
  }

  async findByIdAndUpdate(id: ObjectId | string, queryUpdate: any, options?: any) {
    const res = await dbInstance
      .getDatabase()
      .collection(CARD_COLLECTION_NAME)
      .findOneAndUpdate({ _id: new ObjectId(id) }, queryUpdate, options)
    return (res.value as ICard) || null // Example return
  }

  async findByIdAndDelete(id: ObjectId | string) {
    const res = await dbInstance
      .getDatabase()
      .collection(CARD_COLLECTION_NAME)
      .findOneAndDelete({ _id: new ObjectId(id) })
    return res?._id.toString() || null // Example return
  }
}
