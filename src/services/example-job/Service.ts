import { LoggerFacade as Logger, Service } from '@visionelixir/framework'
import {
  Emitter,
  Event,
  VisionElixirApplicationEvents,
} from '@visionelixir/framework'
import { ExampleJobMiddleware } from './middleware/ExampleJobMiddleware'

export default class CoreService implements Service {
  public async init(): Promise<void> {
    Logger.debug('ExampleJob', 'job init')
  }

  public async applicationInit(): Promise<void> {
    Logger.debug('ExampleJob', 'application init')
  }

  public async applicationDown(): Promise<void> {
    Logger.debug('ExampleJob', 'application down')
  }

  /**
   * Application Register Events
   * Registers listeners on the application emitter
   *
   * @param emitter
   */
  public applicationRegisterEvents(emitter: Emitter): void {
    emitter.on(
      VisionElixirApplicationEvents.INIT_MIDDLEWARE,
      (event: Event): void => {
        const { middleware } = event.getData()
        middleware.push(
          ExampleJobMiddleware.a(),
          ExampleJobMiddleware.b(),
          ExampleJobMiddleware.c(),
        )
      },
    )
  }
}
