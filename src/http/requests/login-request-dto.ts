import { Request } from 'express'
import { RequestDtoInterface } from './interfaces/request-dto-interface'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { EmailExists } from '../validators/existing-email-validator'
import { UserPassword } from '../validators/user-password-validator'

export type LoginRequest = Request & {
  body: {
    email: string
    password: string
  }
}

export class LoginRequestDto implements RequestDtoInterface {
  @IsNotEmpty()
  @IsEmail()
  @EmailExists()
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
