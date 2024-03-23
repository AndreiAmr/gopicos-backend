import { app } from '@infra/server';
import supertest from 'supertest';
import request from 'supertest';

describe('Authentication Login route', () => {
  it('should make login successfully', async () => {
    const response = await supertest(app).post('/api/auth/login').send({
      email: 'andrei@gmail.com',
      password: 'Amaral@2',
    });

    const { status, data } = response.body;

    expect(status).toBe('success');
    expect(data.user).toHaveProperty('id');
    expect(data.user).toHaveProperty('name');
    expect(data.user.name).toBe('Andrei');
  });

  it("should return error if password doesn't match", async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'andrei@gmail.com',
      password: '12345678',
    });

    const { status, data } = response.body;

    expect(status).toBe('error');
    expect(data.message).toBe('Invalid password');
  });

  it('should not find a user', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'no@existing.com',
      password: 'amaral',
    });

    const { status, data } = response.body;

    expect(status).toBe('error');
    expect(data.message).toBe('User not found');
  });

  it('should return status error if email is not provided', async () => {
    const response = await supertest(app).post('/api/auth/login').send({
      email: '',
      password: 'amaral',
    });

    const { status, data } = response.body;

    expect(status).toBe('error');
    expect(data.message).toBe('Invalid Credentials');
  });

  it('should return status error if password is not provided', async () => {
    const response = await supertest(app).post('/api/auth/login').send({
      email: 'andrei@gmail.com',
      password: '',
    });

    const { status, data } = response.body;

    expect(status).toBe('error');
    expect(data.message).toBe('Invalid Credentials');
  });
});
