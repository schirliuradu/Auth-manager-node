import express from 'express'
import { AuthController } from '../controllers/auth-controller'
import { AuthService } from '../../services/auth-service'
import { validateRequest } from '../middlewares/validation-middleware'
import { RegisterRequestDto } from '../requests/register-request-dto'
import { UserService } from '../../services/user-service'
import { User } from '../../entities/User'
import { JwtService } from '../../services/jwt-service'
import { LoginRequestDto } from '../requests/login-request-dto'
import { Db } from '../../config/db/database'

const router = express.Router()

const authController = new AuthController(
  new AuthService(new UserService(Db.getRepository(User)), new JwtService(Db.getRepository(User))),
)

router.post(
  '/register',
  (req, res, next) => validateRequest(RegisterRequestDto, req, res, next),
  authController.register.bind(authController),
)

router.post(
  '/login',
  (req, res, next) => validateRequest(LoginRequestDto, req, res, next),
  authController.login.bind(authController),
)

export default router
