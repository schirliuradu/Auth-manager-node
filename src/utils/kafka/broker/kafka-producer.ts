import { Producer } from 'kafkajs'
import { Registry } from '../schema-registry/registry'

export class KafkaProducer {
  constructor(
    private readonly producer: Producer,
    private readonly registry: Registry,
  ) {
    this.producer = producer
  }

  async publishMessage(topic: string, message: object) {
    await this.producer.send({
      topic,
      messages: [
        {
          value: await this.registry.encode(topic, message),
        },
      ],
    })
  }
}
