import { EmitterFacade as Emitter } from '@visionelixir/framework/dist/services/event/facade/EmitterFacade'
import {
  Context,
  VisionElixirEvent,
  VisionElixirLocalEvents,
} from '@visionelixir/framework'
import { websiteErrorHandler } from './utils/error-handler'
import { ZoneFacade as Zone } from '@visionelixir/framework/dist/services/zone/facades/ZoneFacade'
import { LoggerFacade as Logger } from '@visionelixir/framework/dist/services/logging/facades/LoggerFacade'
import { CollectorFacade as Collector } from '@visionelixir/framework/dist/services/collector/facades/CollectorFacade'

export default () => {
  Emitter.on(
    VisionElixirLocalEvents.RESPONSE_ERROR,
    async (event: VisionElixirEvent): Promise<void> => {
      const { status, ctx, error } = event.getData()

      await websiteErrorHandler(status, error, ctx)
    },
  )

  Emitter.on(
    VisionElixirLocalEvents.RESPONSE_POST,
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
        VisionElixirLocalEvents.APP_DATA,
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
