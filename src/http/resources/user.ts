import { User } from '../../entities/User'

export class UserResource {
  firstName: string
  email: string

  constructor(user: User) {
    this.firstName = user.firstName
    this.email = user.email
  }
}
