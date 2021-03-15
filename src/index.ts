import { App } from '@visionelixir/framework'
import { APP_CONFIG } from './config/app'

export const app = new App(APP_CONFIG).up().then(() => {
  // party
})
