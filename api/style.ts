import { VercelRequest, VercelResponse } from '@vercel/node'
import { Connect } from '../providers/mongo'
import { getThemeSettingsById } from '../services/user-service'
import { compileTheme } from '../services/render-service'

export default async function(request: VercelRequest, response: VercelResponse) {
   const { pageConfigId } = request.query
   let source: string, themeSettings: any = null

   try {
      await Connect()
      
      themeSettings = await getThemeSettingsById(pageConfigId.toString())

      if (!themeSettings) {
         return response
            .setHeader('Content-Type', 'text/html')
            .status(404)
            .redirect('/404.html')
      }
      
      source = await compileTheme(themeSettings.theme, themeSettings.styles)
   } catch (error) {
      return response
         .setHeader('Content-Type', 'text/html')
         .status(500)
         .redirect('/500.html')
   }

   response
      .setHeader('Content-Type', 'text/css')
      .status(200)
      .send(source)
}
