import { JwtService } from './jwt-service'
import { UserService } from './user-service'
import { RegisterRequestDto } from '../http/requests/register-request-dto'
import { LoginRequestDto } from '../http/requests/login-request-dto'

export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterRequestDto) {
    const user = await this.userService.createUser(dto)

    return { user, token: await this.jwtService.generateToken(user) }
  }

  async login(dto: LoginRequestDto) {
    const user = await this.userService.findByEmail(dto.email)

    if (!user) {
      throw new Error('Invalid credentials')
    }

    return { user, token: await this.jwtService.generateToken(user) }
  }
}
