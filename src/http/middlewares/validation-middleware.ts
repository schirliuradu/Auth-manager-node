import { validate } from 'class-validator'
import { Request, Response, NextFunction } from 'express'
import { RequestDtoInterface } from '../requests/interfaces/request-dto-interface'

export const validateRequest = <T extends RequestDtoInterface>(
  dtoType: { new (...args: any[]): T },
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.log(req.body)
  const requestDto = new dtoType(req)
  validate(requestDto).then((errors) => {
    if (errors.length) {
      return res.status(422).json({
        error: 'Validation failure',
        constraints: errors.map((error) => error.constraints),
      })
    }

    next()
  })
}
