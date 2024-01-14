import { Request } from 'express'
import { RequestDtoInterface } from './interfaces/request-dto-interface'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { UserPassword } from '../validators/user-password-validator'
import { ExistingUser } from '../validators/existing-user-validator'

export type LoginRequest = Request & {
  body: {
    email: string
    password: string
  }
}

export class LoginRequestDto implements RequestDtoInterface {
  @IsNotEmpty()
  @IsEmail()
  @ExistingUser()
  email: string

  @IsString()
  @IsNotEmpty()
  @UserPassword()
  password: string

  constructor(request: LoginRequest) {
    this.email = request.body.email
    this.password = request.body.password
  }

  public static fromRequest(req: LoginRequest): LoginRequestDto {
    return new LoginRequestDto(req)
  }
}
