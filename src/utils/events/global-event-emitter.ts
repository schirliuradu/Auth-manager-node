import EventEmitter from 'events'
import { UserCreated } from '../../events/user-created'
import { producer } from '../kafka/broker/kafka-instance'
import { Registry } from '../kafka/schema-registry/registry'
import { KafkaProducer } from '../kafka/broker/kafka-producer'
import { UserCreatedListener } from '../../listeners/user-created-listener'
import { schemaRegistryInstance } from '../kafka/schema-registry/schema-registry-instance'

const emitter = new EventEmitter()

// set other listeners
const userCreatedListener = new UserCreatedListener(new KafkaProducer(producer, new Registry(schemaRegistryInstance)))

// set other event listeners
emitter.on(UserCreated.event, userCreatedListener.handle.bind(userCreatedListener))

export default emitter
