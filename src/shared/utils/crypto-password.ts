import ServerError from '@shared/errors/server-error';
import crypto from 'crypto';

const hashPassword = (password: string) => {
  const salt = process.env.CRYPTO_SALT;

  if (!salt)
    throw new ServerError({
      message: 'Salt not found',
      statusCode: 404,
    });

  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');

  return hash;
};

const comparePassword = (password: string, actualPassword: string) => {
  if (!password || !actualPassword) return false;

  const salt = process.env.CRYPTO_SALT;

  if (!salt)
    throw new ServerError({
      message: 'Salt not found',
      statusCode: 404,
    });

  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');

  return hash === actualPassword;
};

export { hashPassword, comparePassword };
