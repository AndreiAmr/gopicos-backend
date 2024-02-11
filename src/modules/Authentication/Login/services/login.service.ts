import { UserRepository } from '@database/repositories/UserRepository';
import { MakeLoginService } from './makeLoginService.factory';

const userRepository = UserRepository.getInstance();
const LoginServiceFactory = new MakeLoginService(userRepository);

const loginService = LoginServiceFactory.execute.bind(LoginServiceFactory);

export { loginService };
