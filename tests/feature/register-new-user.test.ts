import app from '../../src/app'
import { Request } from 'express'
const request = require('supertest')
import { User } from '../../src/entities/User'
import { Db } from '../../src/config/db/database'
import { UserService } from '../../src/services/user-service'
import { RegisterDto } from '../../src/http/requests/dto/register-dto'

describe('Register new user', () => {
  beforeAll(async () => {
    await Db.initialize()
  })

  afterEach(async () => {
    await Db.synchronize(true)
  })

  it('should validate body and return 422 status code', async () => {
    const req = {
      body: { firstName: 'John Doe', email: 'john.doe@test.com' },
    } as Request

    const response = await request(app).post('/api/register').send(req)

    expect(response.status).toBe(422)
    expect(response.body.constraints).toBeDefined()
    expect(response.body.error).toBe('Validation failure')
  })

  it('should return 422 if user with given email already exists in the db', async () => {
    const req = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.com',
      password: 'Test123@!34d#',
    }

    const userRepository = Db.getRepository(User)
    const userService = new UserService(userRepository)
    await userService.createUser(req as RegisterDto)

    const response = await request(app).post('/api/register').send(req).set('Content-type', 'application/json')

    expect(response.status).toBe(422)
    expect(response.body.error).toBe('Validation failure')
    expect(response.body.constraints).toBeDefined()
  })

  it('should create a new user and return user information with jwt', async () => {
    const req = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@test.com',
      password: 'Test123@!34d#',
    }

    const response = await request(app).post('/api/register').send(req).set('Content-type', 'application/json')

    expect(response.status).toBe(201)
    expect(response.body.user).toBeDefined()
    expect(response.body.token).toBeDefined()
    expect(response.body.user).toEqual({
      firstName: 'John',
      email: 'john.doe@test.com',
    })
  })
})
