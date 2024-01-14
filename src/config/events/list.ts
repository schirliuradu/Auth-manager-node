import { UserCreated } from '../../events/user-created'
import { UserCreatedListener } from '../../listeners/user-created-listener'
import { KafkaProducer } from '../../utils/kafka/broker/kafka-producer'
import { producer } from '../../utils/kafka/broker/kafka-instance'
import { Registry } from '../../utils/kafka/schema-registry/registry'
import { schemaRegistryInstance } from '../../utils/kafka/schema-registry/schema-registry-instance'

export const events = [
  {
    name: UserCreated.event,
    listener: new UserCreatedListener(new KafkaProducer(producer, new Registry(schemaRegistryInstance))),
  },
  // add other events with their listeners here
]
