import { Expose } from 'class-transformer'
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class DtoCreateColumn {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  title: string

  @Expose()
  @IsString()
  @IsNotEmpty()
  boardId: string
}
