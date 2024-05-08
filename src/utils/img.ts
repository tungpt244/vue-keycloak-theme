import { Environment } from '@/types'

export const loadImg = (src: string, context?: Environment) => {
  return import.meta.env.DEV ? src : `${context?.urls.resourcesPath}${src}`
}
