export type JWTToken = {
  email: string;
  iat: number;
  exp: number;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      actualUser?: JWTToken;
    }
  }
}
