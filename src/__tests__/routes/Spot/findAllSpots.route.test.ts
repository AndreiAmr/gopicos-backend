import { app } from '@infra/server';
import { Spot } from '@prisma/client';
import supertest from 'supertest';

describe('Find All Spots Route', () => {
  it('should return all spots', async () => {
    const authResponse = await supertest(app).post('/api/auth/login').send({
      email: 'andrei@gmail.com',
      password: 'Amaral@2',
    });

    const response = await supertest(app)
      .get('/api/spots/list')
      .set('Cookie', [`token=${authResponse.body.data.accessToken}`]);

    const data = response.body;

    expect(response.status).toBe(200);

    data.forEach((spot: Spot) => {
      expect(spot).toHaveProperty('id');
      expect(spot).toHaveProperty('name');
      expect(spot).toHaveProperty('description');
      expect(spot).toHaveProperty('rate');
      expect(spot).toHaveProperty('hasRoof');
      expect(spot).toHaveProperty('isPaid');
      expect(spot).toHaveProperty('entryAmount');
      expect(spot).toHaveProperty('latitude');
      expect(spot).toHaveProperty('longitude');
      expect(spot).toHaveProperty('address');
      expect(spot).toHaveProperty('authorId');
      expect(spot).toHaveProperty('createdAt');
      expect(spot).toHaveProperty('updatedAt');
      expect(spot).toHaveProperty('deletedAt');
      expect(spot).toHaveProperty('deleted');
      expect(spot).toHaveProperty('images');
      expect(spot.images).toBeInstanceOf(Array);
      expect(spot).toHaveProperty('Rating');
    });
  });
  it('Should throw Token Not Found error', async () => {
    const response = await supertest(app).get('/api/spots/list');

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Token not found');
  });

  it('Should throw expired token error', async () => {
    const fakeJWTToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuZHJlaUBnbWFpbC5jb20iLCJpYXQiOjE3MTQxNzAxMjksImV4cCI6MTcxNDE3MDQyOX0.TTnxfGEoup0F9LMZrtaxHR36FKYH8ZFzJdXKmmbwte0';
    const response = await supertest(app)
      .get('/api/spots/list')
      .set('Cookie', [`token=${fakeJWTToken}`]);

    expect(response.status).toBe(401);
    expect(response.body.error).toBe(
      'Your token has expired. Please log in again'
    );
  });

  it('Should throw unauthorized error', async () => {
    const fakeJWTToken = 'totally_fake_token';
    const response = await supertest(app)
      .get('/api/spots/list')
      .set('Cookie', [`token=${fakeJWTToken}`]);

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Unauthorized');
  });

  it('Should not find SECRET Env', async () => {
    process.env.SECRET = '';

    const response = await supertest(app).get('/api/spots/list');

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Secret env not found');
  });
});
