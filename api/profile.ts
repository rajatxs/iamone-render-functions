import { VercelRequest, VercelResponse } from '@vercel/node'
import { Connect } from '../providers/mongo'
import { getUserDataByUsername } from '../services/user-service'
import { prepareTemplateSource } from '../services/render-service'

export default async function(request: VercelRequest, response: VercelResponse) {
   const { username } = request.query
   let userData: any, source: string

   response.setHeader('Content-Type', 'text/html')

   try {
      await Connect()

      userData = await getUserDataByUsername(username.toString())

      if (!userData) {
         return response
            .status(404)
            .redirect('/404.html')
      }

      source = await prepareTemplateSource(userData)
   } catch (error) {
      return response
         .status(500)
         .redirect('/500.html')
   }

   response.send(source)
}
