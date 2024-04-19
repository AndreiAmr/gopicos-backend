import { prisma } from '@database/db';
import { UserActivityConfirmations } from '@prisma/client';
import {
  CreateActivityConfirmationDTO,
  DeleteActivityConfirmationDTO,
  FindByEmailAndTypeDTO,
} from '@shared/types/userActivityConfirmation';

interface IUserActivityConfirmationsRepository {
  findByEmailAndType(
    dto: FindByEmailAndTypeDTO
  ): Promise<UserActivityConfirmations | null>;

  create(
    dto: CreateActivityConfirmationDTO
  ): Promise<UserActivityConfirmations>;

  delete(dto: DeleteActivityConfirmationDTO): Promise<void>;
}

class UserActivityConfirmationsRepository
  implements IUserActivityConfirmationsRepository
{
  private static instance: UserActivityConfirmationsRepository;
  constructor() {}

  public static getInstance(): UserActivityConfirmationsRepository {
    if (!UserActivityConfirmationsRepository.instance) {
      UserActivityConfirmationsRepository.instance =
        new UserActivityConfirmationsRepository();
    }

    return UserActivityConfirmationsRepository.instance;
  }

  async findByEmailAndType({
    email,
    type,
  }: FindByEmailAndTypeDTO): Promise<UserActivityConfirmations | null> {
    const currentActivity = await prisma.userActivityConfirmations.findFirst({
      where: {
        email: email,
        activity: type,
        deleted: false,
      },
    });

    return currentActivity;
  }

  async create({
    email,
    token,
    type,
  }: CreateActivityConfirmationDTO): Promise<UserActivityConfirmations> {
    const newActivity = await prisma.userActivityConfirmations.create({
      data: {
        expiresAt: new Date(new Date().getTime() + 1 * 60000),
        email,
        token,
        activity: type,
      },
    });

    return newActivity;
  }

  async delete({ id }: DeleteActivityConfirmationDTO) {
    await prisma.userActivityConfirmations.update({
      where: {
        id,
      },
      data: {
        deleted: true,
      },
    });
  }
}

export default UserActivityConfirmationsRepository;
