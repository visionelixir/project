import { KeyValue } from '../../../../framework'

export interface ErrorHandlerResult {
  status: number
  body: string | KeyValue
}
