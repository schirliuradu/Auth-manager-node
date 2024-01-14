import { Request, Response, NextFunction } from 'express'
import { JwtService } from '../../../../src/services/jwt-service'
import { Db } from '../../../../src/config/db/database'
import { User } from '../../../../src/entities/User'
import { jwtAuthMiddleware } from '../../../../src/http/middlewares/jwt-auth-middleware'

jest.mock('../../../../src/services/jwt-service')
jest.mock('../../../../src/config/db/database')

describe('jwtAuthMiddleware', () => {
  let req: Partial<Request>
  let res: Partial<Response>
  let next: NextFunction
  let jwtService: jest.Mocked<JwtService>

  beforeEach(() => {
    req = {
      headers: {
        authorization: 'Bearer validToken',
      },
    }
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    }
    next = jest.fn()
    jwtService = new JwtService(Db.getRepository(User) as any) as jest.Mocked<JwtService>
    ;(JwtService as jest.MockedClass<typeof JwtService>).mockImplementation(() => jwtService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call next when a valid token is provided', async () => {
    await jwtAuthMiddleware(req as Request, res as Response, next)

    expect(jwtService.verifyToken).toHaveBeenCalledWith('validToken')
    expect(next).toHaveBeenCalled()
    expect(res.status).not.toHaveBeenCalled()
    expect(res.send).not.toHaveBeenCalled()
  })

  it('should send a 401 response when no token is provided', async () => {
    req.headers!.authorization = undefined

    await jwtAuthMiddleware(req as Request, res as Response, next)

    expect(jwtService.verifyToken).not.toHaveBeenCalled()
    expect(next).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.send).toHaveBeenCalledWith({ errors: ['No bearer token provided!'] })
  })

  it('should send a 401 response when an invalid token is provided', async () => {
    req = {
      headers: {
        authorization: 'Bearer validToken',
      },
    }

    jwtService.verifyToken = jest.fn().mockRejectedValue(new Error('Invalid token'))

    await jwtAuthMiddleware(req as Request, res as Response, next)

    expect(jwtService.verifyToken).toHaveBeenCalledWith('validToken')
    expect(next).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.send).toHaveBeenCalledWith({ error: new Error('Invalid token') })
  })
})
