import mongoose from 'mongoose'

export const convertObjectId = (id: string) => new mongoose.Types.ObjectId(id)
