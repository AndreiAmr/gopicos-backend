import { confirmEmailService } from '../services/confirmEmail.service';
import MakeConfirmEmailController from './makeConfirmEmailController.factory';

const confirmEmailFactory = new MakeConfirmEmailController(confirmEmailService);

const confirmEmailController =
  confirmEmailFactory.execute.bind(confirmEmailFactory);

export { confirmEmailController };
