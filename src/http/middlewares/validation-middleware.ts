import { validate } from 'class-validator'
import { Request, Response, NextFunction } from 'express'
import { RequestDtoInterface } from '../requests/dto/interfaces/request-dto-interface'

export const validateRequest = async <T extends RequestDtoInterface>(
  dtoType: { new (...args: any[]): T },
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const requestDto = new dtoType(req)

  const errors = await validate(requestDto)

  if (errors.length) {
    return res.status(422).json({
      error: 'Validation failure',
      constraints: errors.map((error) => error.constraints),
    })
  }

  next()
}
