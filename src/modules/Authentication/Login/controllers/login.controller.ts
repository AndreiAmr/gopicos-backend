import { loginService } from '../services/login.service';
import { MakeLoginController } from './makeLoginController.factory';

const LoginControllerFactory = new MakeLoginController(loginService);

const loginController = LoginControllerFactory.handle.bind(
  LoginControllerFactory
);

export { loginController };
