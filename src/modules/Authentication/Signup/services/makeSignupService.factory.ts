import { UserRepository } from '@database/repositories/UserRepository';
import { User } from '@prisma/client';
import { CreateUserDTO } from '@shared/types/user';

export interface ISignupService {
  (user: CreateUserDTO): Promise<Omit<User, 'password'>>;
}

export class MakeSignupServiceFactory {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(user: CreateUserDTO) {
    const userAlreadyExists = await this.userRepository.findByEmail(user.email);

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const userCreated = await this.userRepository.create(user);

    return userCreated;
  }
}
