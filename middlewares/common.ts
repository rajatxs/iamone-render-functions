import { AppMiddleware } from '@rxpm/vsfm'

export const corsMiddleware: AppMiddleware = (request, response, next) => {
   response.setHeader('Access-Control-Allow-Origin', '*')
   response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
   response.setHeader('Access-Control-Allow-Headers', 'X-Client-Id, Content-Type')

   next()
} 
