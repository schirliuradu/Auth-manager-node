import { Kafka } from 'kafkajs'

export const producer = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID,
  brokers: [process.env.KAFKA_BROKER!],
}).producer()
