import { Router } from 'express';
import { authenticationRoutes } from './AuthenticationRoutes';
import { spotsRoutes } from './Spots/spots.routes';

const routes = Router();

routes.use(authenticationRoutes);
routes.use(spotsRoutes);

export { routes };
