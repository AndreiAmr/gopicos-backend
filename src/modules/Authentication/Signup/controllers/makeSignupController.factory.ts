import { CreateUserDTO } from '@shared/types/user';
import { ISignupService } from '../services/makeSignupService.factory';
import { NextFunction, Request, Response } from 'express';

export class MakeSignUpControllerFactory {
  constructor(private readonly signUpService: ISignupService) {}

  public async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const user: CreateUserDTO = request.body;

      const userCreated = await this.signUpService(user);

      response.status(201).send({
        status: 'success',
        data: {
          user: userCreated,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
