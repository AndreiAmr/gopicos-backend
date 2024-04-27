import { prisma } from '@database/db';
import { app } from '@infra/server';
import supertest from 'supertest';
import fs from 'fs';

describe('Create Spot Route', () => {
  afterAll(async () => {
    await prisma.$transaction(async (tx) => {
      const spotCreated = await tx.spot.findFirst({
        where: {
          name: 'Testing spot',
        },
      });

      spotCreated?.images.forEach(async (imgName) => {
        fs.unlink(`uploads/picos/${imgName}`, () => {
          console.log('Image deleted');
        });
      });

      await tx.spot.delete({
        where: {
          id: spotCreated?.id,
        },
      });
    });
  });

  it('should create a spot', async () => {
    const authResponse = await supertest(app).post('/api/auth/login').send({
      email: 'andrei@gmail.com',
      password: 'Amaral@2',
    });

    const response = await supertest(app)
      .post('/api/spots/create')
      .set('Cookie', [`token=${authResponse.body.data.accessToken}`])
      .field('authorId', `${authResponse.body.data.user.id}`)
      .field('name', 'Testing spot')
      .field(
        'description',
        'Testing the description field of the spot being created'
      )
      .field('hasRoof', 'TEsting')
      .field('isPaid', 'TEsting')
      .field('entryAmount', 'TEsting')
      .field('longitude', 'TEsting')
      .field('latitude', 'TEsting')
      .attach('image', 'src/__tests__/routes/Spot/spot-testing.jpg');

    const data = response.body;

    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('name');
    expect(data).toHaveProperty('description');
    expect(data).toHaveProperty('rate');
    expect(data).toHaveProperty('hasRoof');
    expect(data).toHaveProperty('isPaid');
    expect(data).toHaveProperty('entryAmount');
    expect(data).toHaveProperty('latitude');
    expect(data).toHaveProperty('longitude');
    expect(data).toHaveProperty('address');
    expect(data).toHaveProperty('authorId');
    expect(data).toHaveProperty('createdAt');
    expect(data).toHaveProperty('updatedAt');
    expect(data).toHaveProperty('deletedAt');
    expect(data).toHaveProperty('deleted');
    expect(data).toHaveProperty('images');
    expect(data.images).toBeInstanceOf(Array);
  });
  it('should throw an error when trying to create a spot with invalid data', async () => {
    const authResponse = await supertest(app).post('/api/auth/login').send({
      email: 'andrei@gmail.com',
      password: 'Amaral@2',
    });

    const response = await supertest(app)
      .post('/api/spots/create')
      .set('Cookie', [`token=${authResponse.body.data.accessToken}`])
      .field('authorId', `${authResponse.body.data.user.id}`)
      .field(
        'description',
        'Testing the description field of the spot being created'
      )
      .field('hasRoof', 'TEsting')
      .field('isPaid', 'TEsting')
      .field('entryAmount', 'TEsting')
      .field('longitude', 'TEsting')
      .field('latitude', 'TEsting')
      .attach('image', 'src/__tests__/routes/Spot/spot-testing.jpg');

    const data = response.body;

    expect(data.error).toBeInstanceOf(Object);
  });
});
