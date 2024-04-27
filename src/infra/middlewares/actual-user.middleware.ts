import { UserRepository } from '@database/repositories/UserRepository';
import ServerError from '@shared/errors/server-error';
import { JWTToken } from '@shared/types/jwt-token';
import { NextFunction, type Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const actualUserMiddleware = async (
  req: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const secret = process.env.SECRET;

    if (!secret) {
      throw new ServerError({
        statusCode: 500,
        message: 'Secret env not found',
      });
    }

    const token = req.headers.cookie?.split('=')[1];

    if (!token) {
      throw new ServerError({
        statusCode: 404,
        message: 'Token not found',
      });
    }

    const tokenPayload: JWTToken = jwt.decode(token) as JWTToken;

    if (!tokenPayload) {
      throw new ServerError({
        statusCode: 401,
        message: 'Unauthorized',
      });
    }

    const isTokenExpired = tokenPayload.exp < Math.floor(Date.now() / 1000);

    if (isTokenExpired) {
      req.actualUser = undefined;
      response.clearCookie('token');
      throw new ServerError({
        statusCode: 401,
        message: 'Your token has expired. Please log in again',
      });
    }

    const user = await UserRepository.getInstance().findByEmail(
      tokenPayload.email
    );

    if (!user) {
      throw new ServerError({
        statusCode: 404,
        message: 'User not found',
      });
    }

    req.actualUser = {
      email: user.email,
      iat: tokenPayload.iat,
      exp: tokenPayload.exp,
    };
    next();
  } catch (err) {
    next(err);
  }
};
