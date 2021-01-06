import { ViewConfig } from '@visionelixir/framework'

export const VIEW_CONFIG: ViewConfig = {
  serviceViewDirectory: 'views',
  themes: {
    directory: 'themes',
    fallback: ['analytics', 'base'],
  },
}
