import {
  Middleware,
  Context,
  Next,
  LoggerFacade as Logger,
} from '@visionelixir/framework'

export class ExampleJobMiddleware {
  public static a(): Middleware {
    return async (ctx: Context, next: Next): Promise<void> => {
      ctx.a = 'a'
      Logger.info('ExampleJob', 'a before')
      await next()
      Logger.info('ExampleJob', 'a after')

      ctx.result = ctx.data.get('run')
      Logger.debug('ExampleJob', 'ctx', ctx)
    }
  }

  public static b(): Middleware {
    return async (ctx: Context, next: Next): Promise<void> => {
      ctx.b = 'b'
      Logger.info('ExampleJob', 'b before')
      await next()
      Logger.info('ExampleJob', 'b after')
    }
  }

  public static c(): Middleware {
    return async (ctx: Context, next: Next): Promise<void> => {
      ctx.c = 'c'
      Logger.info('ExampleJob', 'c before')
      await next()
      Logger.info('ExampleJob', 'c after')
    }
  }
}
