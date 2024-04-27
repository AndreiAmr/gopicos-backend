import { IUserRepository } from '@database/repositories/UserRepository';
import { User } from '@prisma/client';
import ServerError from '@shared/errors/server-error';
import { comparePassword } from '@shared/utils/crypto-password';

export interface ILoginService {
  (email: string, password: string): Promise<User>;
}

export class MakeLoginService {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new ServerError({
        statusCode: 404,
        message: 'User not found',
      });
    }

    const passwordsMatch = comparePassword(password, user.password);

    if (!passwordsMatch) {
      throw new ServerError({
        statusCode: 400,
        message: 'Invalid password.',
      });
    }

    return user;
  }
}
