import { Db } from '../../../config/db/database'

export const bootDatabaseConnection = async () => {
  await Db.initialize()
}
