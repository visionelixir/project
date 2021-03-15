import {
  AppType,
  Environment,
  LoggingDriver,
  VisionElixirJobConfig,
} from '@visionelixir/framework'
import * as path from 'path'
import { DATABASE_CONFIG } from './database'
import { JOB_SERVICES_CONFIG } from './job-services'

export const JOB_CONFIG: VisionElixirJobConfig = {
  type: AppType.JOB,

  name: Environment.get('NAME', 'My Job'),

  debug: true,

  baseDirectory: path.normalize(`${__dirname}/..`),

  logging: {
    type: LoggingDriver.CONSOLE,
  },

  database: DATABASE_CONFIG,
  services: JOB_SERVICES_CONFIG,
}
