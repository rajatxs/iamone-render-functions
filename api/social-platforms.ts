import { VercelRequest, VercelResponse } from '@vercel/node'
import { compose } from '@rxpm/vsfm'
import { corsMiddleware } from '../middlewares/common'

export default compose(
   corsMiddleware,
   async (request: VercelRequest, response: VercelResponse) => {
      const result = (await import('../data/social-platforms.json')).default

      response.setHeader('Cache-Control', 'max-age=259200')
      response.status(200).send({ result })
   }
)
