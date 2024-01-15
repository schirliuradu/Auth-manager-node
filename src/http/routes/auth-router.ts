import express from 'express'
import { AuthController } from '../controllers/auth-controller'
import { AuthService } from '../../services/auth-service'
import { validateRequest } from '../middlewares/validation-middleware'
import { UserService } from '../../services/user-service'
import { User } from '../../entities/User'
import { JwtService } from '../../services/jwt-service'
import { Db } from '../../config/db/database'
import { RegisterDto } from '../requests/dto/register-dto'
import { LoginDto } from '../requests/dto/login-dto'

const router = express.Router()

const authController = new AuthController(new AuthService(new UserService(Db.getRepository(User)), new JwtService()))

router.post(
  '/register',
  (req, res, next) => validateRequest(RegisterDto, req, res, next),
  authController.register.bind(authController),
)

router.post(
  '/login',
  (req, res, next) => validateRequest(LoginDto, req, res, next),
  authController.login.bind(authController),
)

export default router
