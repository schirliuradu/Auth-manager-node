import { Request, Response } from 'express'
import { AuthService } from '../../services/auth-service'
import { RegisterRequestDto } from '../requests/register-request-dto'
import { LoggedUserResource } from '../resources/logged-user'
import { LoginRequestDto } from '../requests/login-request-dto'

export class AuthController {
  constructor(private readonly authService: AuthService) {
    this.authService = authService
  }

  async register(req: Request, res: Response) {
    const registerDto = RegisterRequestDto.fromRequest(req)

    const { user, token } = await this.authService.register(registerDto)

    res.status(201).json(new LoggedUserResource(user, token))
  }

  async login(req: Request, res: Response) {
    const loginDto = LoginRequestDto.fromRequest(req)

    const { user, token } = await this.authService.login(loginDto)

    res.json(new LoggedUserResource(user, token))
  }
}
