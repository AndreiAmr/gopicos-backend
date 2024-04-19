import { NextFunction, Request, Response } from 'express';
import { IEmailVerificationService } from '../services/makeEmailVerificationService.factory';

class MakeEmailVerificationController {
  constructor(
    private readonly emailVerificationService: IEmailVerificationService
  ) {}

  async execute(request: Request, response: Response, next: NextFunction) {
    try {
      const { email } = request.body;

      await this.emailVerificationService(email);

      response.status(200).send();
    } catch (err) {
      next(err);
    }
  }
}

export default MakeEmailVerificationController;
