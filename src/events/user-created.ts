import { User } from '../entities/User'
import { Dispatchable } from './interfaces/dispatchable'

export class UserCreated implements Dispatchable {
  static readonly event = Symbol('UserCreated')

  constructor(public readonly user: User) {}
}
