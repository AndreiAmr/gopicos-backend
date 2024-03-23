import { NextFunction, Request, Response } from 'express';
import { ILoginService } from '../services/makeLoginService.factory';
import { comparePassword } from '@shared/utils/crypto-password';

interface LoginDTO {
  email: string;
  password: string;
}

export class MakeLoginController {
  constructor(private readonly loginService: ILoginService) {}

  public async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const user: LoginDTO = request.body;

      if (!user.email || !user.password) {
        response.status(400).send({
          status: 'error',
          data: {
            message: 'Invalid Credentials',
          },
        });
        return;
      }

      const userFinded = await this.loginService(user.email);

      if (!userFinded) {
        response.status(401).send({
          status: 'error',
          data: {
            message: 'User not found',
          },
        });
        return;
      }

      const passwordsMatch = comparePassword(
        user.password,
        userFinded.password
      );

      if (!passwordsMatch) {
        response.status(401).send({
          status: 'error',
          data: {
            message: 'Invalid password',
          },
        });
        return;
      }

      const { password: _, ...rest } = userFinded;

      response.status(200).send({
        status: 'success',
        data: {
          user: rest,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}
