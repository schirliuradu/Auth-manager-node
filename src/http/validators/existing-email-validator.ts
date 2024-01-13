import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import { Db } from '../../utils/db/database'
import { User } from '../../entities/User'

@ValidatorConstraint({ async: true })
export class EmailExistsConstraint implements ValidatorConstraintInterface {
  async validate(email: string, _: ValidationArguments) {
    const userRepository = Db.getRepository(User)
    const user = await userRepository.findOneBy({ email })

    return !!user
  }

  defaultMessage() {
    return 'Email $value does not exist in the database.'
  }
}

export function EmailExists(validationOptions?: { message?: string }) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: EmailExistsConstraint,
    })
  }
}
