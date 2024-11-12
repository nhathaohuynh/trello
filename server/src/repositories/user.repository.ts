/* eslint-disable @typescript-eslint/no-explicit-any */
import { injectable } from 'inversify'
import { ObjectId } from 'mongodb'
import { dbInstance } from '~/databases/database-connection'
import {
  INVALID_UPDATE_FIELDS_USER,
  IUser,
  USER_COLLECTION_NAME,
  USER_COLLECTION_SCHEMA
} from '~/databases/models/user.model'
import { IRepository } from '~/interface/base/IRepository.base'

@injectable()
export class UserRepository implements IRepository<IUser> {
  constructor() {}
  async find(query: Partial<IUser>, page: number, limit: number) {
    return { data: [], total: 0, page, limit }
  }

  async findOne(query: Partial<IUser>) {
    return await dbInstance.getDatabase().collection<IUser>(USER_COLLECTION_NAME).findOne(query)
  }

  async findById(id: string | ObjectId) {
    return await dbInstance
      .getDatabase()
      .collection<IUser>(USER_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) })
  }

  async findByEmail(email: string) {
    const data = await dbInstance.getDatabase().collection<IUser>(USER_COLLECTION_NAME).findOne({ email })
    if (!data) return null
    return data
  }

  async create(data: Partial<IUser>) {
    const validData = await USER_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
    const result = await dbInstance.getDatabase().collection<IUser>(USER_COLLECTION_NAME).insertOne(validData)
    return result.acknowledged ? result.insertedId : null
  }

  async findByIdAndUpdate(id: ObjectId | string, queryUpdate: any, options?: any) {
    const data = queryUpdate.$set | queryUpdate.$push | queryUpdate.$pull

    Object.keys(data).forEach((key) => {
      if (INVALID_UPDATE_FIELDS_USER.includes(key)) {
        delete queryUpdate.$set[key]
      }
    })

    const res = await dbInstance
      .getDatabase()
      .collection<IUser>(USER_COLLECTION_NAME)
      .findOneAndUpdate({ _id: new ObjectId(id) }, queryUpdate, options)

    return JSON.parse(JSON.stringify(res)) as IUser
  }

  async findByIdAndDelete(id: ObjectId | string) {
    const res = await dbInstance
      .getDatabase()
      .collection<IUser>(USER_COLLECTION_NAME)
      .findOneAndDelete({ _id: new ObjectId(id) })
    return res?._id || null
  }
}
