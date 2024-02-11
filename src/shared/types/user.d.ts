import { User } from '@prisma/client';

export type UserEntity = Omit<User, 'password'>;

export type CreateUserDTO = {
  name: string;
  lastname: string;
  nickname?: string;
  email: string;
  password: string;
};
