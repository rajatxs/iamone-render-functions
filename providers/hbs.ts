import * as handlebars from 'handlebars'

let hbs = handlebars.create()

hbs.registerPartial('useProperty', (context, options) => {
   const prop = context.name
   let root: any

   if (options) {
      root = options.data.root
   }

   return (prop in root) ? root[prop] : context.default
})

export default hbs
