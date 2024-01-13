import { User } from '../../entities/User'
import { DataSource, DataSourceOptions } from 'typeorm'

const databaseConfig =
    process.env.NODE_ENV === 'test'
        ? {
            type: 'sqlite' as 'sqlite',
            database: ':memory:',
            dropSchema: true,
            entities: [User],
            synchronize: true,
            logging: false,
        }
        : {
            type: process.env.DB_DRIVER as 'mysql',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            synchronize: process.env.NODE_ENV === 'local',
            logging: false,
            entities: [User],
        }

export const Db = new DataSource(databaseConfig as DataSourceOptions)
