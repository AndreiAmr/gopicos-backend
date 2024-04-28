import { prisma } from '@database/db';
import { app } from '@infra/server';
import supertest from 'supertest';

describe('Rating spot route', () => {
  afterAll(async () => {
    await prisma.rating.deleteMany({
      where: {
        title: 'Testing with jest on nodejs',
      },
    });
  });

  it('Should rate a spot successfully', async () => {
    const { body: authBody } = await supertest(app)
      .post('/api/auth/login')
      .send({
        email: 'andrei@gmail.com',
        password: 'Amaral@2',
      });

    console.log({ authBody });

    const spotMocked = await prisma.spot.findFirst({
      where: {
        name: 'BNH Skatepark',
      },
    });

    const { status, body } = await supertest(app)
      .post('/api/rating/create')
      .set('Cookie', [`token=${authBody.data.accessToken}`])
      .send({
        userId: authBody.data.user.id,
        spotId: spotMocked?.id,
        title: 'Testing with jest on nodejs',
        comment: 'This is a comment for testing purposes',
        rate: 5,
      });
    console.log({ status, body });

    expect(status).toBe(201);
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('comment');
    expect(body).toHaveProperty('userId');
    expect(body).toHaveProperty('spotId');
    expect(body).toHaveProperty('rate');
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('createdAt');
    expect(body).toHaveProperty('updatedAt');
    expect(body).toHaveProperty('deleted');
    expect(body).toHaveProperty('deletedAt');
  });

  it('Should throw an error when rating a spot with same title', async () => {
    const { body: authBody } = await supertest(app)
      .post('/api/auth/login')
      .send({
        email: 'andrei@gmail.com',
        password: 'Amaral@2',
      });

    console.log({ authBody });

    const spotMocked = await prisma.spot.findFirst({
      where: {
        name: 'BNH Skatepark',
      },
    });

    const { status, body } = await supertest(app)
      .post('/api/rating/create')
      .set('Cookie', [`token=${authBody.data.accessToken}`])
      .send({
        userId: authBody.data.user.id,
        spotId: spotMocked?.id,
        title: 'Testing with jest on nodejs',
        comment: 'This is a comment for testing purposes',
        rate: 5,
      });

    expect(status).toBe(400);
    expect(body.error).toBe('You already commented this on this spot');
  });
});
