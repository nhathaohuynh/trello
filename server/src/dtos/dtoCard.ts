import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

export class DtoCreateCard {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  title: string

  @IsString()
  @IsNotEmpty()
  columnId: string
}

export class DtoUpdateCard {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  columnId: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MinLength(5)
  @MaxLength(50)
  title: string

  @IsArray()
  @IsNotEmpty()
  @IsOptional()
  memberIds: string[]

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  cover: string

  @IsArray()
  @IsNotEmpty()
  @IsOptional()
  comments: string[]

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  _destroy: boolean
}
