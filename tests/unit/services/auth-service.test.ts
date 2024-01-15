import { JwtService } from '../../../src/services/jwt-service'
import { AuthService } from '../../../src/services/auth-service'
import { UserService } from '../../../src/services/user-service'
import { LoginDto } from '../../../src/http/requests/dto/login-dto'
import { RegisterDto } from '../../../src/http/requests/dto/register-dto'

describe('AuthService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('register', () => {
    it('should register a user and return user and token', async () => {
      const registerDto: RegisterDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password',
      }

      const expectedUser = { id: 1, email: registerDto.email }
      const expectedToken = 'generatedToken'

      const mockUserService = {
        createUser: jest.fn().mockResolvedValueOnce(expectedUser),
      } as unknown as UserService

      const mockJwtService = {
        generateToken: jest.fn().mockReturnValueOnce(expectedToken),
      } as unknown as JwtService

      const authService = new AuthService(mockUserService, mockJwtService)

      const result = await authService.register(registerDto)

      expect(result).toEqual({ user: expectedUser, token: expectedToken })
      expect(mockUserService.createUser).toHaveBeenCalledWith(registerDto)
      expect(mockJwtService.generateToken).toHaveBeenCalledWith(expectedUser)
    })
  })

  describe('login', () => {
    it('should login a user and return user and token', async () => {
      const loginDto: LoginDto = {
        email: 'john.doe@example.com',
        password: 'password',
      }

      const expectedUser = { id: 1, email: loginDto.email }
      const expectedToken = 'generatedToken'

      const mockUserService = {
        findByEmail: jest.fn().mockResolvedValueOnce(expectedUser),
      } as unknown as UserService

      const mockJwtService = {
        generateToken: jest.fn().mockReturnValueOnce(expectedToken),
      } as unknown as JwtService

      const authService = new AuthService(mockUserService, mockJwtService)

      const result = await authService.login(loginDto as LoginDto)

      expect(result).toEqual({ user: expectedUser, token: expectedToken })
      expect(mockUserService.findByEmail).toHaveBeenCalledWith(loginDto.email)
      expect(mockJwtService.generateToken).toHaveBeenCalledWith(expectedUser)
    })

    it('should throw an error for invalid credentials', async () => {
      // Arrange
      const loginDto: LoginDto = {
        email: 'nonexistent@example.com',
        password: 'password',
      }

      const mockUserService = {
        findByEmail: jest.fn().mockResolvedValueOnce(null),
      } as unknown as UserService

      const mockJwtService = {
        generateToken: jest.fn().mockReturnValueOnce('token'),
      } as unknown as JwtService

      const authService = new AuthService(mockUserService, mockJwtService)

      await expect(authService.login(loginDto)).rejects.toThrowError('Invalid credentials')
      expect(mockUserService.findByEmail).toHaveBeenCalledWith(loginDto.email)
      expect(mockJwtService.generateToken).not.toHaveBeenCalled()
    })
  })
})
