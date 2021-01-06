import {
  Service,
  EmitterFacade as Emitter,
  LoggerFacade as Logger,
  CollectorFacade as Collector,
  ZoneFacade as Zone,
  VisionElixirLocalEvents,
  VisionElixirEvent,
  Context,
} from '@visionelixir/framework'
import { websiteErrorHandler } from './utils/errorHandler'

export default class CoreService implements Service {
  public registerEvents(): void {
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
}
