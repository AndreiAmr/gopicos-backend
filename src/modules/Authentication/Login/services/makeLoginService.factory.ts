import { IUserRepository } from '@database/repositories/UserRepository';
import { User } from '@prisma/client';

export interface ILoginService {
  (email: string): Promise<User | null>;
}

export class MakeLoginService {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return null;
    }

    return user;
  }
}
