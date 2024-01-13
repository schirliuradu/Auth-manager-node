import {producer} from "../../kafka/broker/kafka-instance";

export const bootProducerConnection = async () => {
    await producer.connect()
}