import { MongoClient, Db } from 'mongodb'

let db: Db

/**
 * Returns `Db` connection object
 */
export async function Connect(): Promise<Db> {
   let client: MongoClient

   if (db) {
      return db
   }

   client = await MongoClient.connect(process.env.MONGO_CONNECTION_URL)
   db = client.db(process.env.MONGO_DB_NAME)

   return db
}

/**
 * Returns `db` object
 */
export function mongo() {
   return db
}
