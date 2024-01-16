import { Repository } from 'typeorm'
import { User } from '../entities/User'
import { UserCreated } from '../events/user-created'
import emitter from '../utils/boot/events/event-emitter'
import { RegisterDto } from '../http/requests/dto/register-dto'

export class UserService {
  constructor(private readonly repository: Repository<User>) {}

  async findByEmail(email: string) {
    return this.repository.findOneBy({ email })
  }

  async createUser(dto: RegisterDto) {
    const user = new User()

    Object.assign(user, dto)

    await this.repository.save(user)

    // if other operations with users will be added (permissions or other) add db transaction

    emitter.emit(UserCreated.event, new UserCreated(user))

    return user
  }
}
