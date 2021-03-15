import {
  Middleware,
  Context,
  Next,
  VisionElixirError,
  PerformanceFacade as Performance,
  ConfigFacade as Config,
  ViewFacade as View,
  AppFacade as App,
  DatabaseFacade as Database,
} from '@visionelixir/framework'

export class HomeMiddleware {
  public static response500(): Middleware {
    return async (): Promise<void> => {
      throw new VisionElixirError('Oh noes :(', 'I just blew my payload')
    }
  }

  public static info(): Middleware {
    return async (ctx: Context): Promise<void> => {
      await Database.get().query(`SELECT * FROM accounts`, [], 'Get Accounts')

      ctx.body = { name: App.getConfig().name }
    }
  }

  public static response302(): Middleware {
    return async (ctx: Context): Promise<void> => {
      ctx.redirect('/')
    }
  }

  public static view(): Middleware {
    return async (ctx: Context, next: Next): Promise<void> => {
      await next()

      Performance.start('View:Render')

      const rendered = View.render('welcome', {
        page: {
          title: 'Vision Elixir',
        },
        app: {
          name: Config.name,
        },
      })

      Performance.stop('View:Render')

      ctx.body = rendered
    }
  }
}
