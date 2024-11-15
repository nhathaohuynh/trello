import { Transform } from 'class-transformer'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { ObjectId } from 'mongoose'
import { convertObjectId } from '~/utils/mongoose.util'

export class DtoCreateComment {
  @IsString()
  @IsNotEmpty()
  content: string

  @IsString()
  @IsNotEmpty()
  @Transform((value) => convertObjectId(value.toString()))
  user: ObjectId

  @IsString()
  @IsNotEmpty()
  @Transform((value) => convertObjectId(value.toString()))
  cardId: ObjectId

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Transform((value) => convertObjectId(value.toString()))
  parent: ObjectId
}

export class DtoUpdateComment {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  content: string
}
