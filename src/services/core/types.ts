import { KeyValue } from '@visionelixir/framework'

export interface ErrorHandlerResult {
  status: number
  body: string | KeyValue
}

export enum ErrorResponse {
  WEBSITE = 'website',
  API = 'api',
}

declare module '@visionelixir/framework' {
  interface VisionElixirConfig {
    errorHandling: ErrorResponse
  }
}
