import { MongoClient, Db } from 'mongodb'

let db: Db

/**
 * Returns `Db` connection object
 */
export async function Connect(): Promise<Db> {
   let client: MongoClient

   if (db) {
      console.log("MongoDB", "Using existing connection")
      return db
   }

   console.log("MongoDB", "Creating new connection")
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
