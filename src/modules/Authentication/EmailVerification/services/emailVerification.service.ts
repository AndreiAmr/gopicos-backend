import UserActivityConfirmationsRepository from '@database/repositories/UserActivityConfirmations';
import { MakeEmailVerificationService } from './makeEmailVerificationService.factory';

const userActivityConfirmationsRepository =
  UserActivityConfirmationsRepository.getInstance();
const emailVerificationServiceFactory = new MakeEmailVerificationService(
  userActivityConfirmationsRepository
);

const emailVerificationService = emailVerificationServiceFactory.handle.bind(
  emailVerificationServiceFactory
);

export { emailVerificationService };
