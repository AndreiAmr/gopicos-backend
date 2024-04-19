import { validateSignupMiddleware } from '@infra/middlewares/validate-signup.middleware';
import { confirmEmailController } from '@modules/Authentication/ConfirmEmail/controllers/confirmEmail.controller';
import { emailVerificationController } from '@modules/Authentication/EmailVerification/controllers/emailVerification.controller';
import { loginController } from '@modules/Authentication/Login/controllers/login.controller';
import { signupController } from '@modules/Authentication/Signup/controllers/signup.controller';
import { Router } from 'express';

const routes = Router();

routes.post('/auth/login', loginController);
routes.post('/email/verification', emailVerificationController);
routes.post('/email/confirmation', confirmEmailController);
routes.post('/auth/signup', validateSignupMiddleware, signupController);

export { routes as authenticationRoutes };
