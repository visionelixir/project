import { Service } from '@visionelixir/framework'
import routes from './routes'

export default class HomeService implements Service {
  public registerRoutes(): void {
    routes()
  }
}
