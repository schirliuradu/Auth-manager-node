import { JwtService } from '../../services/jwt-service'
import { Request, Response, NextFunction } from 'express'
import { User } from '../../entities/User'
import {Db} from "../../config/db/database";

export const jwtAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']

  const token = authHeader && authHeader?.split(' ')[1]

  if (!token) {
    return res.status(401).send({ errors: ['No bearer token provided!'] })
  }

  const jwtService = new JwtService(Db.getRepository(User))

  try {
    await jwtService.verifyToken(token!)

    next()
  } catch (error) {
    res.status(401).send({ error: error })
  }
}
