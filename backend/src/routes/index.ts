// import { logger } from '../logger/index'
// import { Application } from 'express'
// import HealthRouter from './Health';
// import FiltersRouter from './Filters';

// const Routes = [
//     { path: '/', router: FiltersRouter},
//     { path: '/health', router: HealthRouter },
// ]

// const configureRoutes = (app: Application): void => {
//   if (!app || !app.use) {
//     logger.error(
//       '[Error] Route Initialization Failed: app / app.use is undefined'
//     )
//     return process.exit(1)
//   }

//   // Custom Routes
//     Routes.forEach((route) => app.use(route.path, route.router));
// }

// export { configureRoutes }
