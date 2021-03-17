import {
  KeyValue,
  ViewFacade as View,
  VisionElixirError,
  HttpStatus,
  LoggerFacade,
} from '@visionelixir/framework'
import { ErrorHandlerResult } from '../types'

export class ErrorHandler {
  public static async website(
    statusCode: HttpStatus,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: VisionElixirError<any>,
  ): Promise<ErrorHandlerResult> {
    const errorBody: {
      message: string
      type?: string
      name?: string
      payload?: KeyValue
    } = {
      message: `Sorry, that's an error.`,
    }

    if (error?.isPassThrough()) {
      errorBody.type = error?.getType()
      errorBody.name = error?.getName()
      errorBody.message =
        error?.getPassThroughMessage() ||
        error?.getMessage() ||
        errorBody.message

      if (error?.getPayload()) {
        errorBody.payload = error.getPayload()
      }
    }

    const status = error?.getOptions()?.status || statusCode
    let body: string

    try {
      switch (statusCode) {
        case 500:
          body = View.render('errors/500', {
            page: { title: 'Uh oh...', name: errorBody.message },
          })

          break
        case 404:
          body = View.render('errors/404', {
            page: {
              title: 'Uh oh...',
              name: 'Sorry, that page was not found...',
            },
          })

          break
        default:
          body = View.render('errors/error', {
            page: { title: 'Uh oh...', name: errorBody.message },
          })
      }
    } catch (caughtError) {
      LoggerFacade.critical('ErrorHandler', caughtError.message, {
        error: caughtError,
      })

      throw caughtError
    }

    return {
      body,
      status,
    }
  }

  public static async websiteDebug(
    statusCode: HttpStatus,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: VisionElixirError<any>,
  ): Promise<ErrorHandlerResult> {
    const status = error?.getOptions()?.status || statusCode

    if (statusCode === HttpStatus.NOT_FOUND) {
      return {
        status,
        body: View.render('errors/404', {
          page: { title: 'Uh oh...', name: 'That was not found' },
        }),
      }
    }

    let view: string

    try {
      view = View.render('errors/debug', {
        page: { title: 'Uh oh...' },
        error: {
          type: error.getType(),
          name: error.getName(),
          message: error.getMessage(),
          isPassThrough: error.isPassThrough(),
          passThroughMessage: error.getPassThroughMessage(),
          payload: JSON.stringify(error.getPayload(), null, 2),
          passThroughPayload: JSON.stringify(
            error.getPassThroughPayload(),
            null,
            2,
          ),
          stack: error.getStack(),
        },
      })
    } catch (caughtError) {
      LoggerFacade.critical('ErrorHandler', caughtError.message, {
        error: caughtError,
      })

      throw caughtError
    }

    return {
      body: view,
      status,
    }
  }

  public static async api(
    statusCode: HttpStatus,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: VisionElixirError<any> | null,
  ): Promise<ErrorHandlerResult> {
    if (statusCode === HttpStatus.NOT_FOUND && !error) {
      return {
        body: { success: false, error: 'Not found' },
        status: statusCode,
      }
    }

    const errorBody: {
      message: string
      type?: string
      name?: string
      payload?: KeyValue
    } = {
      message: `Sorry, that's an error.`,
    }

    if (error?.isPassThrough()) {
      errorBody.type = error?.getType()
      errorBody.name = error?.getName()
      errorBody.message =
        error?.getPassThroughMessage() ||
        error?.getMessage() ||
        errorBody.message

      if (error?.getPayload()) {
        errorBody.payload = error?.getPassThroughPayload()
      }
    }

    return {
      body: { success: false, error: errorBody },
      status: error?.getOptions()?.status || statusCode,
    }
  }

  public static async apiDebug(
    statusCode: HttpStatus,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: VisionElixirError<any>,
  ): Promise<ErrorHandlerResult> {
    if (statusCode === HttpStatus.NOT_FOUND && !error) {
      return {
        body: { error: 'Not found' },
        status: statusCode,
      }
    }

    const errorBody: {
      message: string
      passThroughMessage?: string
      type?: string
      name?: string
      payload?: KeyValue
      passThroughPayload?: KeyValue
      stack?: string
    } = {
      type: error?.getType(),
      name: error?.getName(),
      message: error?.getMessage(),
      passThroughMessage: error?.getPassThroughMessage(),
      payload: error?.getPayload(),
      passThroughPayload: error?.getPassThroughPayload(),
      stack: error?.getStack(),
    }

    return {
      body: { success: false, error: errorBody },
      status: error?.getOptions()?.status || statusCode,
    }
  }
}
