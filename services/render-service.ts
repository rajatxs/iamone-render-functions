import type { TemplateDelegate } from 'handlebars'
import hbs from '../providers/hbs'
import { join } from 'path'
import { readFile } from 'fs'

/**
 * Compile theme source
 * @param themeName - Theme name
 * @param customStyles - Custom theme styles
 */
export async function compileTheme(themeName: string, customStyles: any = {}) {
   return new Promise(async (resolve, reject) => {
      let themeConfig: any = {}, themeObject: any = {}, delegation: TemplateDelegate<any>

      themeConfig = await import(`../themes/${themeName}.json`)
      themeObject = { ...themeConfig, ...customStyles }

      readFile(join(__dirname, '..', 'templates', 'default.style.hbs'), 'utf8', (error, content) => {
         if (error) {
            return reject(error)
         }

         delegation = hbs.compile(content, { data: true })
         resolve(delegation(themeObject))
      })
   })
}

export function compileLayout(templateName: string, layoutName: string, data: any = {}): Promise<string> {
   return new Promise(async (resolve, reject) => {
      let delegation: TemplateDelegate<any>

      readFile(join(__dirname, '..', 'templates', `${layoutName}.layout.hbs`), 'utf8', (error, content) => {
         if (error) {
            return reject(error)
         }

         compileTemplate(templateName, data)
            .then(body => {
               delegation = hbs.compile(content, { data: true })
               resolve(
                  delegation(
                     Object.assign(data, { body })
                  )
               )
            })
            .catch(reject)
      })
   })
}

export function compileTemplate(templateName: string, data: any = {}): Promise<string> {
   return new Promise((resolve, reject) => {
      let delegation: TemplateDelegate<any>

      readFile(join(__dirname, '..', 'templates', `${templateName}.hbs`), 'utf8', (error, content) => {
         if (error) {
            return reject(error)
         }

         delegation = hbs.compile(content, { data: true })
         resolve(delegation(data))
      })
   })
}

export async function prepareTemplateSource(data: any = {}) {
   data.css = await compileTheme(data.page.theme, data.page.styles)
   return compileLayout(data.page.templateName, 'default', data)
}
