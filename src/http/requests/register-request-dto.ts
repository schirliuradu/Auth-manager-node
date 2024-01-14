import { Request } from 'express'
import { RequestDtoInterface } from './interfaces/request-dto-interface'
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength } from 'class-validator'
import { UnusedEmail } from '../validators/unused-email-validator'

export type RegisterRequest = Request & {
  body: {
    firstName: string
    lastName: string
    email: string
    password: string
  }
}

export class RegisterRequestDto implements RequestDtoInterface {
  @IsNotEmpty()
  @IsString()
  @MaxLength(25)
  firstName: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(25)
  lastName: string

  @IsNotEmpty()
  @IsEmail()
  @UnusedEmail()
  email: string

  @IsNotEmpty()
  @IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
  password: string

  constructor(request: RegisterRequest) {
    this.firstName = request.body.firstName
    this.lastName = request.body.lastName
    this.email = request.body.email
    this.password = request.body.password
  }

  public static fromRequest(req: RegisterRequest): RegisterRequestDto {
    return new RegisterRequestDto(req)
  }
}
