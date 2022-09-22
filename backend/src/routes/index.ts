import { Application } from 'express'
import GithubRouter from '../routes/GithubRouter'

const Routes = [{ path: '/', router: GithubRouter }]

const configureRoutes = (app: Application): void => {
  // Custom Routes
  Routes.forEach((route) => app.use(route.path, route.router))
}

export { configureRoutes }
