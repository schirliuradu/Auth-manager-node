import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import * as bcrypt from 'bcrypt'
import { User } from '../../entities/User'
import { Db } from '../../config/db/database'

interface ObjectArgs {
  email: string
  password: string
}

@ValidatorConstraint({ async: true })
export class UserPasswordConstraint implements ValidatorConstraintInterface {
  async validate(password: string, { object }: ValidationArguments) {
    const currentObject = <ObjectArgs>object
    const userRepository = Db.getRepository(User)
    const user = await userRepository.findOneBy({ email: currentObject.email })

    if (user) {
      return await bcrypt.compare(password, user.password)
    }

    return false
  }

  defaultMessage() {
    return 'Incorrect password for given user.'
  }
}

export function UserPassword(validationOptions?: { message?: string }) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UserPasswordConstraint,
    })
  }
}
