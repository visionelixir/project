import { RouterFacade as Router } from '@visionelixir/framework'
import { HomeMiddleware } from './middleware/home'

export default () => {
  Router.get('', [HomeMiddleware.view()])
  Router.get('302', [HomeMiddleware.response302()])
  Router.get('info', [HomeMiddleware.info()])
  Router.get('500', [HomeMiddleware.response500()])
}
