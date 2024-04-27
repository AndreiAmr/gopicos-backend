import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ILoginService } from '../services/makeLoginService.factory';
import { JWTToken } from '@shared/types/jwt-token';

interface LoginDTO {
  email: string;
  password: string;
}

const SECRET = process.env.SECRET as string;

export class MakeLoginController {
  constructor(private readonly loginService: ILoginService) {}

  public async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const userPayload: LoginDTO = request.body;

      if (!userPayload.email || !userPayload.password) {
        response.status(400).send({
          status: 'error',
          data: {
            message: 'Invalid Credentials',
          },
        });
        return;
      }

      const user = await this.loginService(
        userPayload.email,
        userPayload.password
      );

      const jwtToken = jwt.sign(
        {
          email: user.email,
        } as JWTToken,
        SECRET,
        { expiresIn: 300 }
      );

      response.cookie('token', jwtToken, {
        secure: false,
        httpOnly: true,
      });

      response.status(200).send({
        status: 'success',
        data: {
          user,
          accessToken: jwtToken,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}
