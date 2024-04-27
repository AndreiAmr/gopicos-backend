import { app } from '@infra/server';
import supertest from 'supertest';

describe('Spot Detail Route', () => {
  it('Should find a spot by id', async () => {
    const authResponse = await supertest(app).post('/api/auth/login').send({
      email: 'andrei@gmail.com',
      password: 'Amaral@2',
    });

    const spotDetailResponse = await supertest(app)
      .get('/api/spots/ccc98116-a1e6-4091-b976-d67a9a3d74ae')
      .set('Cookie', [`token=${authResponse.body.data.accessToken}`]);

    const { spot } = spotDetailResponse.body;

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
    expect(spot).toHaveProperty('Rating');
    expect(spot).toHaveProperty('author');
  });
  it('Should not find a spot by passed id', async () => {
    const authResponse = await supertest(app).post('/api/auth/login').send({
      email: 'andrei@gmail.com',
      password: 'Amaral@2',
    });

    const { body } = await supertest(app)
      .get('/api/spots/fake-id')
      .set('Cookie', [`token=${authResponse.body.data.accessToken}`]);

    expect(body).toHaveProperty('error');
    expect(body.error).toBe('Spot not found');
  });
});
