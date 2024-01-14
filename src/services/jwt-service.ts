import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken'
import { User } from '../entities/User'
import { Repository } from 'typeorm'

const { JWT_SECRET, JWT_EXPIRE_TIME } = process.env

interface UserJwtPayload extends JwtPayload {
  userId: number
}

export class JwtService {
  constructor(private readonly userRepository: Repository<User>) {}

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

  async verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET!, {}, async (err, decoded) => {
      if (err) {
        throw err
      }

      const decodedJwt = decoded as UserJwtPayload

      if (decodedJwt.userId) {
        const user = await this.userRepository.findOneBy({ id: decodedJwt.userId })

        if (!user) {
          throw new JsonWebTokenError('Jwt token invalid user provided!')
        }
      }
    })
  }
}
