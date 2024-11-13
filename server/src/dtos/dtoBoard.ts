import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'
import { BOARD_TYPES } from '~/utils/constant.util'

export class DtoCreateBoard {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  title: string

  @IsString()
  @IsEnum(BOARD_TYPES)
  @IsNotEmpty()
  type: Enumerator<typeof BOARD_TYPES>

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(256)
  description: string
}

export class DtoUpdateBoard {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @IsOptional()
  title: string

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(256)
  description: string

  @IsString()
  @IsEnum(BOARD_TYPES)
  @IsNotEmpty()
  @IsOptional()
  type: Enumerator<typeof BOARD_TYPES>

  @IsArray()
  @IsOptional()
  columnOrderIds: string[]

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  cover: string

  @IsString()
  @IsOptional()
  ownerIds: string[]

  @IsString()
  @IsOptional()
  memberIds: string[]

  @IsBoolean()
  @IsOptional()
  _destroy: boolean
}
