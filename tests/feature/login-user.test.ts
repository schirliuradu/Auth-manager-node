import app from '../../src/app'
import { Request } from 'express'
const request = require('supertest')
import { Db } from '../../src/config/db/database'
import { UserService } from '../../src/services/user-service'
import { User } from '../../src/entities/User'

describe('Login existing user', () => {
  beforeAll(async () => {
    await Db.initialize()
  })

  afterEach(async () => {
    await Db.synchronize(true)
  })

  it('should validate body and return 422 status code', async () => {
    const req = {
      body: { email: 'john.doe@test.com' },
    } as Request

    const response = await request(app).post('/api/login').send(req)

    expect(response.status).toBe(422)
    expect(response.body.constraints).toBeDefined()
    expect(response.body.error).toBe('Validation failure')
  })

  it('should check for user in db and throw error if not existing', async () => {
    const req = {
      email: 'john.doe@test.com',
      password: 'Test123@!34d#',
    }

    const response = await request(app).post('/api/login').send(req)

    expect(response.status).toBe(422)
    expect(response.body.constraints).toBeDefined()
    expect(response.body.error).toBe('Validation failure')
    expect(response.body.constraints).toEqual([
      {
        ExistingUserConstraint: "User with given email john.doe@test.com doesn't seem to exist in the database.",
      },
      {
        UserPasswordConstraint: 'Incorrect password for given user.',
      },
    ])
  })

  it('should login user and return user information and token', async () => {
    const service = new UserService(Db.getRepository(User))
    await service.createUser({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@test.com',
      password: 'Test123@!34d#',
    })

    const req = {
      email: 'john.doe@test.com',
      password: 'Test123@!34d#',
    }

    const response = await request(app).post('/api/login').send(req)

    expect(response.status).toBe(200)
    expect(response.body.user).toBeDefined()
    expect(response.body.token).toBeDefined()
    expect(response.body.user).toEqual({
      firstName: 'John',
      email: 'john.doe@test.com',
    })
  })
})
