import { prisma } from '@database/db';
import { app } from '@infra/server';
import supertest from 'supertest';

const email = 'andrei@gopicos.com';

describe('Email Confirmation Route', () => {
  afterAll(async () => {
    await prisma.$transaction(async (tx) => {
      await tx.userActivityConfirmations.deleteMany({
        where: {
          email,
        },
      });
    });
  });
  it('Should Email Confirmation', async () => {
    const { status, body } = await supertest(app)
      .post('/api/email/verification')
      .send({
        email,
        type: 'EMAIL_CONFIRMATION',
      });

    const userActivityCreated =
      await prisma.userActivityConfirmations.findFirst({
        where: {
          email,
        },
      });

    const confirmationResponse = await supertest(app)
      .post('/api/email/confirmation')
      .send({
        email,
        token: userActivityCreated?.token,
      });

    expect(status).toBe(200);
    expect(confirmationResponse.status).toBe(200);
  });
  it('Should throw an error when passing the invalid code', async () => {
    await supertest(app).post('/api/email/verification').send({
      email,
      type: 'EMAIL_CONFIRMATION',
    });

    const confirmationResponse = await supertest(app)
      .post('/api/email/confirmation')
      .send({
        email,
        token: '0000',
      });

    expect(confirmationResponse.status).toBe(400);
    expect(confirmationResponse.body.error).toBe('Invalid token');
  });
});
