import { Repository } from 'typeorm'
import { User } from '../entities/User'
import { RegisterRequestDto } from '../http/requests/register-request-dto'
import { UserCreated } from '../events/user-created'
import emitter from "../utils/boot/events/event-emitter";

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
