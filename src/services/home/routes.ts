import { HttpStatus, RouterFacade as Router } from '@visionelixir/framework'
import { HomeMiddleware } from './middleware/HomeMiddleware'

export default (): void => {
  Router.get('', [HomeMiddleware.view()])
  Router.get('302', [HomeMiddleware.response302()])
  Router.get('info', [HomeMiddleware.info()])
  Router.get('500', [
    HomeMiddleware.responseError(HttpStatus.INTERNAL_SERVER_ERROR),
  ])
  Router.get('400', [HomeMiddleware.responseError(HttpStatus.BAD_REQUEST)])
  Router.get('403', [HomeMiddleware.responseError(HttpStatus.FORBIDDEN)])
  Router.get('error', [HomeMiddleware.error()])
}
