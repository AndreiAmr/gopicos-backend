import { User } from '@prisma/client';
import { prisma } from '@database/db';
import { CreateUserDTO } from '@shared/types/user';

type UpdateUserDTO = Partial<User>;

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(user: CreateUserDTO): Promise<User | null>;
  update(user: UpdateUserDTO): Promise<User | null>;
  delete(id: string): Promise<boolean>;
}

export class UserRepository implements IUserRepository {
  private static instance: UserRepository | null = null;

  constructor() {}

  public static getInstance(): UserRepository {
    if (!this.instance) {
      this.instance = new UserRepository();
    }
    return this.instance;
  }

  public async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  public async create(user: CreateUserDTO) {
    const userCreated = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        nickname: user.nickname,
        password: user.password,
      },
    });

    return userCreated;
  }

  public async delete(id: string) {
    const userDeleted = await prisma.user.update({
      where: { id },
      data: { deleted: true, deletedAt: new Date() },
    });

    return !!userDeleted;
  }

  public async update(user: UpdateUserDTO) {
    const userUpdated = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        lastname: user.lastname,
        nickname: user.nickname,
        email: user.email,
        password: user.password,
      },
    });

    return userUpdated;
  }
}
