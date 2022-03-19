import { mongo } from '../providers/mongo'

/**
 * Returns user's data by `username`
 * @param username - Username
 */
export function getUserDataByUsername(username: string) {
   return new Promise((resolve, reject) => {
      const collection = mongo().collection('user_data')

      collection.findOne({ 'user.username': username }, (error, result) => {
         if (error) {
            return reject(error)
         }

         resolve(result)
      })
   })
}
