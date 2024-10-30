import { IsNotEmpty, IsString } from 'class-validator'
import { DtoBase } from '../base/DtoBase'

export class DtoEnv extends DtoBase {
  @IsString()
  @IsNotEmpty()
  DB_NAME!: string

  @IsString()
  @IsNotEmpty()
  DB_URI!: string

  @IsString()
  @IsNotEmpty()
  PORT!: number

  @IsString()
  @IsNotEmpty()
  BUILD_MODE!: string
}
