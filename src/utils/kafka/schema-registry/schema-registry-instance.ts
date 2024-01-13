import { SchemaRegistry } from '@kafkajs/confluent-schema-registry'

export const schemaRegistryInstance = new SchemaRegistry({
  host: process.env.SCHEMA_REGISTRY_URL!,
})
