import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

export class DtoUserRegistration {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  username: string

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(8)
  password: string
}

export class DtoUserLogin {
  @IsString()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(8)
  password: string
}

export class DtoVerifyToken {
  @IsString()
  @IsNotEmpty()
  token: string
  email: string
}

export class DtoUpdateInformation {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  username: string

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  phone: string

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  address: string
}

export class DtoUpdatePassword {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(8)
  password: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(8)
  newPassword: string
}
