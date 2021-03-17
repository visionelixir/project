import {
  AppType,
  Environment,
  EnvironmentCasts,
  LoggingDriver,
  VisionElixirConfig,
} from '@visionelixir/framework'
import * as path from 'path'
import { DATABASE_CONFIG } from './database'
import { VIEW_CONFIG } from './view'
import { SERVICES_CONFIG } from './services'

export const APP_CONFIG: VisionElixirConfig = {
  type: AppType.APP,

  name: Environment.get('NAME', 'App'),

  host: Environment.get('HOST', 'http://localhost'),
  port: Environment.get('PORT', 8080, EnvironmentCasts.NUMBER),

  debug: Environment.get('DEBUG', false, EnvironmentCasts.BOOLEAN),

  baseDirectory: path.normalize(`${__dirname}/..`),

  static: {
    directory: 'public',
    maxage: 1000 /*ms*/ * 60 /*s*/ * 60 /*m*/ * 24 /*hr*/, // cache for 1-day
  },

  logging: {
    type: LoggingDriver.CONSOLE,
  },

  view: VIEW_CONFIG,
  database: DATABASE_CONFIG,
  services: SERVICES_CONFIG,
}
