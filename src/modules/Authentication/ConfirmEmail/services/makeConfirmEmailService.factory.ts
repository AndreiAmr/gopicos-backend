import UserActivityConfirmationsRepository from '@database/repositories/UserActivityConfirmations';
import ServerError from '@shared/errors/server-error';

export interface IConfirmEmailService {
  (email: string, token: string): Promise<void>;
}

class MakeConfirmEmailService {
  constructor(
    private readonly userActivityConfirmationsRepository: UserActivityConfirmationsRepository
  ) {}

  public async handle(email: string, token: string): Promise<void> {
    const tokenRegistered =
      await this.userActivityConfirmationsRepository.findByEmailAndType({
        email,
        type: 'EMAIL_CONFIRMATION',
      });

    if (tokenRegistered) {
      const isExpired =
        tokenRegistered.expiresAt.getTime() < new Date().getTime();

      if (isExpired) {
        await this.userActivityConfirmationsRepository.delete({
          id: tokenRegistered.id,
        });

        throw new ServerError({
          message: 'Token expired. Please request a new one',
          statusCode: 400,
        });
      }

      if (tokenRegistered.token !== token)
        throw new ServerError({
          message: 'Invalid token',
          statusCode: 400,
        });

      await this.userActivityConfirmationsRepository.delete({
        id: tokenRegistered.id,
      });
      return;
    }

    throw new ServerError({
      message: 'Token not found',
      statusCode: 400,
    });
  }
}

export default MakeConfirmEmailService;
