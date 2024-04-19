import RabbitMQProvider from '@infra/RabbitMQ';

type IMessagingEmailVerificationDTO = {
  email: string;
  token: string;
};

export const messagingEmailVerificationCode = async ({
  email,
  token,
}: IMessagingEmailVerificationDTO) => {
  const rabbitMQProvider = RabbitMQProvider.getInstance();
  await rabbitMQProvider.intialize();
  const channel = await rabbitMQProvider.createChannel({
    durable: false,
    queueName: 'mailing',
  });

  return await rabbitMQProvider.sendMessage({
    channel,
    message: JSON.stringify({ Email: email, Token: String(token) }),
    queueName: 'mailing',
  });
};
