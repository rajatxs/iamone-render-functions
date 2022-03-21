import * as handlebars from 'handlebars'
import socialPlatforms from '../public/x/social-platforms.json'
import { ObjectId } from 'mongodb'
import { mongo } from '../providers/mongo'

/**
 * Resolves `href` from `templateUrl`
 * @param links - Links
 */
export function resolveSocialLinks(links: any[]) {
   return links.map((link) => {
      const platform = socialPlatforms.find(
         (platform) => platform.key === link.platformKey
      )

      if (!platform) {
         return null
      }

      const delegate = handlebars.compile(platform.templateUrl)
      link['href'] = delegate(link)

      return link
   })
}

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

         if (!result) {
            return resolve(null)
         }

         result.social = resolveSocialLinks(result.social || [])

         resolve(result)
      })
   })
}

/**
 * Returns theme settings by `pageConfig._id`
 * @param id - Page config id
 */
export function getThemeSettingsById(id: string) {
   return new Promise((resolve, reject) => {
      const collection = mongo().collection('page_theme')
      const _id = new ObjectId(id)

      collection.findOne({ _id }, (error, result) => {
         if (error) {
            return reject(error)
         }
         
         resolve(result)
      })
   })
}
