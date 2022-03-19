import * as handlebars from 'handlebars'
import socialPlatforms from '../data/social-platforms.json'
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

         result.social = resolveSocialLinks(result.social || [])

         resolve(result)
      })
   })
}
