import { Response } from 'express'
import { LoginRequest } from '../requests/login-request'
import { AuthService } from '../../services/auth-service'
import { LoggedUserResource } from '../resources/logged-user'
import { RegisterRequest } from '../requests/register-request'
import { RegisterDto } from '../requests/dto/register-dto'
import { LoginDto } from '../requests/dto/login-dto'

export class AuthController {
  constructor(private readonly authService: AuthService) {
    this.authService = authService
  }

  async register(req: RegisterRequest, res: Response) {
    const registerDto = RegisterDto.fromRequest(req)

    const { user, token } = await this.authService.register(registerDto)

    res.status(201).json(new LoggedUserResource(user, token))
  }

  async login(req: LoginRequest, res: Response) {
    const loginDto = LoginDto.fromRequest(req)

    const { user, token } = await this.authService.login(loginDto)

    res.json(new LoggedUserResource(user, token))
  }
}
