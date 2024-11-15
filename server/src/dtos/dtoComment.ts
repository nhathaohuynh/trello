import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { ObjectId } from 'mongoose'

export class DtoCreateComment {
  @IsString()
  @IsNotEmpty()
  content: string

  @IsString()
  @IsNotEmpty()
  user: ObjectId

  @IsString()
  @IsNotEmpty()
  cardId: ObjectId

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  parent: ObjectId
}

export class DtoUpdateComment {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  content: string
}
