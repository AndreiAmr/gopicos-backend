import UserActivityConfirmationsRepository from '@database/repositories/UserActivityConfirmations';
import { MakeEmailVerificationService } from '@modules/Authentication/EmailVerification/services/makeEmailVerificationService.factory';
import MakeConfirmEmailService from './makeConfirmEmailService.factory';

const userActivityConfirmationsRepository =
  UserActivityConfirmationsRepository.getInstance();

const confirmEmailServiceFactory = new MakeConfirmEmailService(
  userActivityConfirmationsRepository
);

const confirmEmailService = confirmEmailServiceFactory.handle.bind(
  confirmEmailServiceFactory
);

export { confirmEmailService };
