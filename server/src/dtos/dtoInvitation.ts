import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class dtoCreateInvitation {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  inviteeEmail: string

  @IsString()
  @IsNotEmpty()
  boardId: string
}
