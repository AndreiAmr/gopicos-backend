import { UserRepository } from '@database/repositories/UserRepository';
import { User } from '@prisma/client';
import ServerError from '@shared/errors/server-error';
import { CreateUserDTO } from '@shared/types/user';
import { hashPassword } from '@shared/utils/crypto-password';

export interface ISignupService {
  (user: CreateUserDTO): Promise<Omit<User, 'password'>>;
}

export class MakeSignupServiceFactory {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(user: CreateUserDTO) {
    const userAlreadyExists = await this.userRepository.findByEmail(user.email);

    if (userAlreadyExists) {
      throw new ServerError({
        message: 'User already exists',
        statusCode: 409,
      });
    }

    const password: string = hashPassword(user.password);

    const userCreated = await this.userRepository.create({
      ...user,
      password,
    });

    return userCreated;
  }
}
