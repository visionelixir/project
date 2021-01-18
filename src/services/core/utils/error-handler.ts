import {
  KeyValue,
  ViewFacade as View,
  ConfigFacade as Config,
  VisionElixirError,
  HttpStatus,
} from '@visionelixir/framework'

export const websiteErrorHandler = async (
  statusCode: number,
  error: Error,
  ctx: KeyValue,
): Promise<void> => {
  if (error && statusCode === HttpStatus.NOT_FOUND) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR
  }

  ctx.status = statusCode

  switch (statusCode) {
    case 500:
      ctx.body = View.render('errors/500', {
        page: { title: 'Uh oh...', name: 'Something went wrong...' },
      })

      break
    case 404:
      ctx.body = View.render('errors/404', {
        page: { title: 'Uh oh...', name: 'That page was not found...' },
      })

      break
    default:
      ctx.body = View.render('errors/error', {
        page: { title: 'Uh oh...', name: 'Something went wrong...' },
      })
  }
}

export const apiErrorHandler = (
  statusCode: number,
  error: VisionElixirError<unknown> | null,
  ctx: KeyValue,
): void => {
  if (error && statusCode === HttpStatus.NOT_FOUND) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR
  }

  ctx.status = statusCode

  switch (statusCode) {
    case HttpStatus.INTERNAL_SERVER_ERROR:
      if (Config.debug && error) {
        const { name, type, message, payload, stack } = error

        ctx.body = {
          name,
          type,
          message,
          payload,
          stack,
        }
      } else {
        ctx.body = { error: "That's an error :(" }
      }
      break
    case HttpStatus.NOT_FOUND:
      if (!ctx.body) {
        ctx.body = { error: "That's a 404 :(" }
      }
      break
    default:
      if (!ctx.body) {
        if (ctx.vision.config.debug && error) {
          const { name, type, message, payload, stack } = error

          ctx.body = {
            name,
            type,
            message,
            payload,
            stack,
          }
        } else {
          ctx.body = { error: "That's an error :(" }
        }
      }
  }
}
