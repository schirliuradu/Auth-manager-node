import jwt from 'jsonwebtoken'
import { User } from '../entities/User'

const { JWT_SECRET, JWT_EXPIRE_TIME } = process.env

export class JwtService {
  async generateToken(user: User) {
    return jwt.sign(
      {
        userId: user.id,
      },
      JWT_SECRET!,
      {
        expiresIn: JWT_EXPIRE_TIME,
      },
    )
  }
}
