import { signupSerivce } from '../services/signup.service';
import { MakeSignUpControllerFactory } from './makeSignupController.factory';

const signupControllerFactory = new MakeSignUpControllerFactory(signupSerivce);

const signupController = signupControllerFactory.handle.bind(
  signupControllerFactory
);

export { signupController };
