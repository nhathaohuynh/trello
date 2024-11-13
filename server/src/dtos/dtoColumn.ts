import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

export class DtoCreateColumn {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  title: string

  @IsString()
  @IsNotEmpty()
  boardId: string
}

export class DtoUpdateColumn {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MinLength(5)
  @MaxLength(50)
  title: string

  @IsArray()
  @IsOptional()
  cardOrderIds: string[]

  @IsBoolean()
  @IsOptional()
  _destroy: boolean
}
