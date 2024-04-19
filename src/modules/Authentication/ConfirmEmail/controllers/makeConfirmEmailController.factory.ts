import { NextFunction, Request, Response } from 'express';
import { IConfirmEmailService } from '../services/makeConfirmEmailService.factory';
import ServerError from '@shared/errors/server-error';

class MakeConfirmEmailController {
  constructor(private readonly confirmEmailService: IConfirmEmailService) {}

  public async execute(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { email, token } = request.body;

      if (!email || !token)
        throw new ServerError({
          message: 'Invalid credentials.',
          statusCode: 400,
        });

      await this.confirmEmailService(email, token);

      return response.status(200).json({ message: 'Email confirmed' });
    } catch (error) {
      next(error);
    }
  }
}

export default MakeConfirmEmailController;
