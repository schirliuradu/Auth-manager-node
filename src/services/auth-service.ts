import { JwtService } from './jwt-service'
import { UserService } from './user-service'
import { RegisterDto } from '../http/requests/dto/register-dto'
import { LoginDto } from '../http/requests/dto/login-dto'

export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const user = await this.userService.createUser(dto)

    return { user, token: await this.jwtService.generateToken(user) }
  }

  async login(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email)

    if (!user) {
      throw new Error('Invalid credentials')
    }

    return { user, token: await this.jwtService.generateToken(user) }
  }
}
