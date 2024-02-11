import { UserRepository } from '@database/repositories/UserRepository';
import { MakeSignupServiceFactory } from './makeSignupService.factory';

const userRepository = UserRepository.getInstance();
const signupServiceFactory = new MakeSignupServiceFactory(userRepository);

const signupSerivce = signupServiceFactory.execute.bind(signupServiceFactory);

export { signupSerivce };
