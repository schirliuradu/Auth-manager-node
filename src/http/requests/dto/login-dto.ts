import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { ExistingUser } from '../../validators/existing-user-validator'
import { UserPassword } from '../../validators/user-password-validator'
import { RequestDtoInterface } from './interfaces/request-dto-interface'
import { LoginRequest } from '../login-request'

export class LoginDto implements RequestDtoInterface {
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

  public static fromRequest(req: LoginRequest): LoginDto {
    return new LoginDto(req)
  }
}
