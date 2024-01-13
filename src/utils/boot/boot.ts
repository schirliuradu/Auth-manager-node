import {bootEvents} from "./events/event-emitter";
import { bootDatabaseConnection } from './db/boot-database-connection'
import {bootProducerConnection} from "./kafka/producer";

export const bootAppDependencies = async () => {
    // We don't want to boot the database connection and kafka consumers during tests
    // because we want to mock them instead
    if (process.env.NODE_ENV !== 'test') {
        await bootDatabaseConnection()
        await bootEvents()
        await bootProducerConnection()
        // await bootKafkaConsumers()
    }
}
