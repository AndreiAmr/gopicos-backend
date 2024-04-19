import { emailVerificationService } from '../services/emailVerification.service';
import MakeEmailVerificationController from './makeEmailVerificationController.factory';

const emailVerificationControllerFactory = new MakeEmailVerificationController(
  emailVerificationService
);

const emailVerificationController =
  emailVerificationControllerFactory.execute.bind(
    emailVerificationControllerFactory
  );

export { emailVerificationController };
