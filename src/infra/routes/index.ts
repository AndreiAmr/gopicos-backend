import { Router } from 'express';
import { authenticationRoutes } from './AuthenticationRoutes';
import { spotsRoutes } from './Spots/spots.routes';
import { ratingSpotRoutes } from './RatingSpotRoutes/ratingSpots.routes';

const routes = Router();

routes.use(authenticationRoutes);
routes.use(spotsRoutes);
routes.use(ratingSpotRoutes);

export { routes };
