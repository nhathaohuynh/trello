import { Expose } from 'class-transformer'
import { IsArray, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

export class DtoCreateBoard {
  @Expose()
  @IsString()
  @IsNotEmpty()
  title: string

  @Expose()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  description: string
}

export class DtoUpdateBoard {
  @Expose()
  @IsString()
  @IsOptional()
  title: string

  @Expose()
  @IsString()
  @IsOptional()
  @MinLength(5)
  @MaxLength(50)
  description: string

  @Expose()
  @IsArray()
  @IsOptional()
  columnOrderIds: string[]
}
