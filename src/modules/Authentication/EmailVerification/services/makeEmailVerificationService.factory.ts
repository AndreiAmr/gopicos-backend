import UserActivityConfirmationsRepository from '@database/repositories/UserActivityConfirmations';
import ServerError from '@shared/errors/server-error';
import { messagingEmailVerificationCode } from '@shared/messaging/email-confirm';
import { generateRandomToken } from '@shared/utils/generate-token';

export interface IEmailVerificationService {
  (email: string): Promise<boolean>;
}

export class MakeEmailVerificationService {
  constructor(
    private readonly userActivityConfirmations: UserActivityConfirmationsRepository
  ) {}

  public async handle(email: string): Promise<boolean> {
    const tokenAlreadyRegisted =
      await this.userActivityConfirmations.findByEmailAndType({
        email,
        type: 'EMAIL_CONFIRMATION',
      });

    const isTokenExpired =
      tokenAlreadyRegisted &&
      tokenAlreadyRegisted?.expiresAt.getTime() < new Date().getTime();

    if (tokenAlreadyRegisted && !isTokenExpired) {
      throw new ServerError({
        message: 'Token already sent, please check your email',
        statusCode: 400,
      });
    }

    if (tokenAlreadyRegisted && isTokenExpired) {
      await this.userActivityConfirmations.delete({
        id: tokenAlreadyRegisted.id,
      });
    }

    const activityCreated = await this.userActivityConfirmations.create({
      email,
      token: String(generateRandomToken()),
      type: 'EMAIL_CONFIRMATION',
    });
    const messageSended = await messagingEmailVerificationCode({
      email,
      token: activityCreated.token,
    });

    return messageSended;
  }
}
