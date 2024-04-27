// jest.mock('multer', () => {
//   const multer = jest.fn().mockReturnValue({
//     diskStorage: jest.fn(),
//   });
//   multer.memoryStorage = () => jest.fn();
//   return multer;
// });

jest.mock('amqplib', () => {
  return {
    connect: jest.fn().mockReturnValue({
      close: jest.fn(),
      createChannel: jest.fn().mockReturnValue({
        assertQueue: jest.fn(),
        assertExchange: jest.fn(),
        sendToQueue: jest.fn(),
      }),
      createConfirmChannel: jest.fn(),
      connection: {
        serverProperties: {},
      },
    }),
  };
});
