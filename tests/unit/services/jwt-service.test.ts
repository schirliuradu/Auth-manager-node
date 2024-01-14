import { describe } from 'node:test'
import { User } from '../../../src/entities/User'
import { JwtService } from '../../../src/services/jwt-service'
import jwt from 'jsonwebtoken'

describe('JwtService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should generate jwt token', async () => {
    // @ts-ignore
    const spy = jest.spyOn(jwt, 'sign').mockImplementationOnce(() => 'token')

    const mockedUser = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@test.com',
    }

    const mockedRepository = {}
    const service = new JwtService(mockedRepository as any)
    const result = await service.generateToken(mockedUser as User)

    expect(result).toEqual('token')
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(
      {
        userId: mockedUser.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE_TIME,
      },
    )
  })

  it('should throw an error for malformed token', async () => {
    const jwtService = new JwtService({} as any)

    await expect(jwtService.verifyToken('invalidToken')).rejects.toThrowError('jwt malformed')
  })

  it('should throw an invalid user provider error token', async () => {
    const mockedRepository = {
      findOneBy: jest.fn().mockResolvedValueOnce(null),
    }

    const jwtService = new JwtService(mockedRepository as any)

    const token = await jwtService.generateToken({ id: 1 } as User)

    await expect(jwtService.verifyToken(token)).rejects.toThrowError('Jwt token invalid user provided!')
  })

  it('should verify and return decoded token', async () => {
    const mockedRepository = {
      findOneBy: jest.fn().mockResolvedValueOnce({ id: 1 }),
    }

    const jwtService = new JwtService(mockedRepository as any)

    const token = await jwtService.generateToken({ id: 1 } as User)

    await expect(jwtService.verifyToken(token)).resolves.not.toThrow()
  })
})
