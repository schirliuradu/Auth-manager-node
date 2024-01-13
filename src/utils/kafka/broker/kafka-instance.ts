import { Kafka } from 'kafkajs'

const kafkaInstance = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID,
  brokers: [process.env.KAFKA_BROKER!],
})

export const producer = kafkaInstance.producer()

export const consumer = kafkaInstance.consumer({
  groupId: process.env.KAFKA_CONSUMER_GROUP_ID!,
  heartbeatInterval: 1000,
  sessionTimeout: 6000,
  maxWaitTimeInMs: 1000,
})
