import { prisma } from '@database/db';
import { app } from '@infra/server';
import { CreateUserDTO } from '@shared/types/user';
import { after } from 'node:test';
import supertest from 'supertest';

const user: CreateUserDTO = {
  name: 'Andrei',
  email: 'andrei@testing.com',
  password: 'Amaral@2',
  lastname: 'Soneca',
  nickname: 'andrei',
};

describe('Authentication Signup route', () => {
  afterAll(async () => {
    const userCreated = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (userCreated) {
      await prisma.user.delete({
        where: {
          email: user.email,
        },
      });
    }
  });

  it('should make signup successfully', async () => {
    const response = await supertest(app).post('/api/auth/signup').send(user);

    const { status, data } = response.body;

    expect(status).toBe('success');
    expect(data.user).toHaveProperty('id');
    expect(data.user).toHaveProperty('name');
    expect(data.user.name).toBe('Andrei');
  });
});
