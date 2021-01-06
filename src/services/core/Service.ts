import { Service } from '@visionelixir/framework'
import events from './events'

export default class CoreService implements Service {
  public registerEvents(): void {
    events()
  }
}
