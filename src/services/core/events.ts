import {
  Context,
  VisionElixirEvent,
  VisionElixirRequestEvents,
  EmitterFacade as Emitter,
  ZoneFacade as Zone,
  LoggerFacade as Logger,
  CollectorFacade as Collector,
  ConfigFacade as Config,
} from '@visionelixir/framework'
import { ErrorHandler } from './utils/ErrorHandler'
import { ErrorHandlerResult } from './types'

export default (): void => {
  Emitter.on(
    VisionElixirRequestEvents.RESPONSE_ERROR,
    async (event: VisionElixirEvent): Promise<void> => {
      const { status, error, ctx } = event.getData()
      let result: ErrorHandlerResult

      if (Config.debug) {
        result = await ErrorHandler.websiteDebug(status, error)
      } else {
        result = await ErrorHandler.website(status, error)
      }

      ctx.body = result.body
      ctx.status = result.status
    },
  )

  Emitter.on(
    VisionElixirRequestEvents.RESPONSE_POST,
    async (event: VisionElixirEvent) => {
      const { ctx }: { ctx: Context } = event.getData()
      const { method, href, url, protocol, ip: remoteIp } = ctx.request
      const { status } = ctx.response
      const requestSize = ctx.req.socket.bytesRead
      const responseSize = ctx.res.getHeader('content-length')
      const userAgent = ctx.request.get('User-Agent')
      const cacheLookup = false
      const cacheHit = false
      const cacheValidatedWithOriginServer = false
      const cacheFillBytes = 0
      const referer = ctx.request.get('referrer')
      const zoneId = Zone.getCurrentZone().get('id')

      await Emitter.emit(
        VisionElixirRequestEvents.APP_DATA,
        new VisionElixirEvent({
          collection: 'request',
          payload: {
            zoneId,
            method,
            url,
            href,
            status,
            requestSize,
            responseSize,
            userAgent,
            cacheLookup,
            cacheHit,
            cacheValidatedWithOriginServer,
            cacheFillBytes,
            remoteIp,
            referer,
            protocol,
          },
        }),
      )

      Logger.info('Collector', `Request Collections: ${url}`, Collector.all())
    },
  )
}
