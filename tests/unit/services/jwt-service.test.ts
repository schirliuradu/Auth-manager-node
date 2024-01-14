import jwt from 'jsonwebtoken'
import { describe } from 'node:test'
import { User } from '../../../src/entities/User'
import { JwtService } from '../../../src/services/jwt-service'

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

    const service = new JwtService()
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
})
