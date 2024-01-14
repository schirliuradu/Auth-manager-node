import { registerDecorator, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { User } from '../../entities/User'
import { Db } from '../../config/db/database'

@ValidatorConstraint({ async: true })
export class ExistingUserConstraint implements ValidatorConstraintInterface {
  async validate(email: string) {
    const userRepository = Db.getRepository(User)

    const user = await userRepository.findOneBy({ email })

    return !!user
  }

  defaultMessage() {
    return "User with given email $value doesn't seem to exist in the database."
  }
}

export function ExistingUser(validationOptions?: { message?: string }) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ExistingUserConstraint,
    })
  }
}
