import { Repository } from 'typeorm'
import { User } from '../../../src/entities/User'
import { UserCreated } from '../../../src/events/user-created'
import { UserService } from '../../../src/services/user-service'
import emitter from '../../../src/utils/boot/events/event-emitter'
import { RegisterDto } from '../../../src/http/requests/dto/register-dto'

jest.mock('../../../src/utils/boot/events/event-emitter', () => ({
  emit: jest.fn(),
}))

describe('UserService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('findByEmail', () => {
    it('should find a user by email', async () => {
      const userEmail = 'test@example.com'
      const expectedUser = { id: 1, email: userEmail } as User

      const mockRepository = {
        findOneBy: jest.fn().mockReturnValueOnce(expectedUser),
      } as unknown as Repository<User>

      const userService = new UserService(mockRepository)

      const result = await userService.findByEmail(userEmail)

      expect(result).toEqual(expectedUser)
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ email: userEmail })
    })

    it('should return null when user is not found by email', async () => {
      const userEmail = 'nonexistent@example.com'

      const mockRepository = {
        findOneBy: jest.fn().mockReturnValueOnce(null),
      } as unknown as Repository<User>

      const userService = new UserService(mockRepository)

      const result = await userService.findByEmail(userEmail)

      expect(result).toBeNull()
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ email: userEmail })
    })
  })

  describe('createUser', () => {
    it('should create a user and emit UserCreated event', async () => {
      const registerDto: RegisterDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password',
      }

      const expectedUser = new User()
      Object.assign(expectedUser, registerDto)

      const mockRepository = {
        save: jest.fn().mockReturnValueOnce(expectedUser),
      } as unknown as Repository<User>

      const userService = new UserService(mockRepository)

      const result = await userService.createUser(registerDto)

      expect(result).toEqual(expectedUser)
      expect(mockRepository.save).toHaveBeenCalledWith(expectedUser)
      expect(emitter.emit).toHaveBeenCalledWith(UserCreated.event, new UserCreated(expectedUser))
    })
  })
})
