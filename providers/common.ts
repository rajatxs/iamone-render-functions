import { join } from 'path'

/**
 * Returns absolute path public dir
 */
export function publicDir() {
   return join(__dirname, '..', 'public')
}
