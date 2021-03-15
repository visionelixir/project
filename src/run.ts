import { App, LoggingDriver, VisionElixirLogger } from '@visionelixir/framework'
import { JOB_CONFIG } from './config/job'

const Logger = new VisionElixirLogger(LoggingDriver.CONSOLE, JOB_CONFIG.logging)
export const app = new App(JOB_CONFIG)
;(async () => {
  // run the jobs in parallel
  const results = await Promise.all([
    app.run({ run: 1 }),
    app.run({ run: 2 }),
    app.run({ run: 3 }),
  ])

  await app.down()
  Logger.notice('ExampleJob', 'Result', results)
})()
