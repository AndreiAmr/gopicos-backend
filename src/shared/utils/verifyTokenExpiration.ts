import ServerError from '@shared/errors/server-error';

type VerifyTokenExpirationProps = {
  expiresAt: Date;
};

export const verifyTokenExpiration = ({
  expiresAt,
}: VerifyTokenExpirationProps) => {
  const isTokenExpired = expiresAt.getTime() < new Date().getTime();

  return isTokenExpired;
};
