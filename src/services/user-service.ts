import { Repository } from 'typeorm'
import { User } from '../entities/User'
import emitter from '../utils/events/global-event-emitter'
import { RegisterRequestDto } from '../http/requests/register-request-dto'
import { UserCreated } from '../events/user-created'

export class UserService {
  constructor(private readonly repository: Repository<User>) {}

  async findByEmail(email: string) {
    return this.repository.findOneBy({ email })
  }

  async createUser(dto: RegisterRequestDto) {
    const user = new User()

    Object.assign(user, dto)

    await this.repository.save(user)

    emitter.emit(UserCreated.event, new UserCreated(user))

    return user
  }
}
