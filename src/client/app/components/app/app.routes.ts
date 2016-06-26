import {provideRouter, RouterConfig} from '@angular/router';

import {AboutRoutes} from '../about/about.routes';
import {HomeRoutes} from '../home/home.routes';
import {RegistryRoutes} from '../registry/registry.routes';

export const routes: RouterConfig = [
  ...HomeRoutes,
  ...AboutRoutes,
  ...RegistryRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
