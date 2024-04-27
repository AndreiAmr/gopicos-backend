import { prisma } from '@database/db';
import { app } from '@infra/server';
import supertest from 'supertest';

const email = 'andrei@gopicos.com';

describe('Generate Email Token Route', () => {
  afterAll(async () => {
    await prisma.$transaction(async (tx) => {
      await tx.userActivityConfirmations.deleteMany({
        where: {
          email,
        },
      });
    });
  });

  it('should generate a token and send an email with it', async () => {
    const { status } = await supertest(app)
      .post('/api/email/verification')
      .send({
        email,
        type: 'EMAIL_CONFIRMATION',
      });

    expect(status).toBe(200);
  });

  it('should throw an error when token is already sended and valid', async () => {
    const { status, body } = await supertest(app)
      .post('/api/email/verification')
      .send({
        email,
        type: 'EMAIL_CONFIRMATION',
      });

    expect(status).toBe(400);
    expect(body.error).toBe('Token already sent, please check your email');
  });
});
