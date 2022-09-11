import { Application } from "express";
// import HealthRouter from './Health';
// import FiltersRouter from './Filters';

const Routes = [
  //   { path: '/', router: FiltersRouter},
  //   { path: '/health', router: HealthRouter },
];

const configureRoutes = (app: Application) => {
  if (!app || !app.use) {
    console.error(
      "[Error] Route Initialization Failed: app / app.use is undefined"
    );
    return process.exit(1);
  }

  // Custom Routes
  //   Routes.forEach((route) => app.use(route.path, route.router));
};

export { configureRoutes };
