import { App } from '@visionelixir/framework'
import { APP_CONFIG } from './config/app'

export const app = new App()
;(async () => {
  await app.create(APP_CONFIG)
  await app.up()
})()
