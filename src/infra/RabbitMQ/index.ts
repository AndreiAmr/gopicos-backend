import ServerError from '@shared/errors/server-error';
import amqp from 'amqplib';

class RabbitMQProvider {
  private static instance: RabbitMQProvider;
  public connection: amqp.Connection | undefined = undefined;

  constructor() {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new RabbitMQProvider();
    }

    return this.instance;
  }

  async intialize() {
    console.log('Initializing RabbitMQ!');
    const connection = await amqp.connect('amqp://guest:guest@localhost:5672');
    this.connection = connection;
  }

  async createChannel({
    queueName,
    durable,
  }: {
    queueName: string;
    durable: boolean;
  }): Promise<amqp.Channel> {
    if (!this.connection) {
      throw new ServerError({
        message: 'RabbitMQ connection is not established',
        statusCode: 500,
      });
    }

    const channel = await this.connection.createChannel();
    await channel.assertQueue(queueName, { durable });

    console.log(`Channel ${queueName} created!`);
    return channel;
  }

  async sendMessage({
    channel,
    queueName,
    message,
  }: {
    channel: amqp.Channel;
    queueName: string;
    message: string;
  }) {
    if (!channel) {
      throw new ServerError({
        message: 'RabbitMQ connection is not established',
        statusCode: 500,
      });
    }

    await channel.assertExchange('gopicos-dev', 'direct', {
      durable: true,
    });

    const messageSended = channel.sendToQueue(queueName, Buffer.from(message));
    return messageSended;
  }
}

export default RabbitMQProvider;
