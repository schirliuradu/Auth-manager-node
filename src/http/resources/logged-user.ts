import { UserResource } from './user'
import { User } from '../../entities/User'

export class LoggedUserResource {
  user: UserResource
  token: string

  constructor(user: User, token: string) {
    this.user = new UserResource(user)
    this.token = token
  }
}
