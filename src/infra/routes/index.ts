import { Router } from 'express';
import { authenticationRoutes } from './AuthenticationRoutes';

const routes = Router();

routes.use(authenticationRoutes);

export { routes };
