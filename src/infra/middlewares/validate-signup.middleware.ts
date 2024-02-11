import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

const signupignupSchema = z.object({
  name: z
    .string()
    .min(3, 'At least 3 characters')
    .max(30, 'At most 30 characters'),
  lastname: z
    .string()
    .min(3, 'At least 3 characters')
    .max(30, 'At most 30 characters'),
  nickname: z.string().optional(),
  email: z.string().trim().email('Invalid email'),
  password: z
    .string()
    .min(8, 'At least 8 characters')
    .max(30, 'At most 30 characters')
    .regex(/^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).+$/),
});

export const validateSignupMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const userInputs = req.body;

  signupignupSchema.parse(userInputs);

  next();
};
