import { UserCreated } from '../events/user-created'
import { Listenable } from './interfaces/listenable'
import { KafkaProducer } from '../utils/kafka/broker/kafka-producer'

export class UserCreatedListener implements Listenable {
  constructor(private readonly producer: KafkaProducer) {}

  async handle(event: UserCreated) {
    await this.producer.publishMessage('user-created', {
      email: event.user.email,
      original_id: event.user.id,
    })
  }
}
