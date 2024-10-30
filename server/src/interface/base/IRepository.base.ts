/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectId } from 'mongodb'

export interface IRepository<T> {
  find: (
    query: Partial<T>,
    page: number,
    limit: number
  ) => Promise<{ data: T[]; total: number; page: number; limit: number }>

  findOne: (query: Partial<T>) => Promise<T | null>

  findById: (id: ObjectId | string) => Promise<T | null> // Updated to return T or null

  create: (data: T) => Promise<ObjectId | null>

  findByIdAndUpdate: (id: ObjectId | string, data: any, options?: any) => Promise<T | null>

  findByIdAndDelete: (id: ObjectId | string) => Promise<string | null>
}
