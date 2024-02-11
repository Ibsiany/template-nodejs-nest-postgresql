import request from 'supertest';
import { app } from '../../../../shared/infra/http/app';
import { User } from '../../infra/typeorm/entities/User';
import { CreateUserService } from '../../services/CreateUserService';

jest.mock('../../services/CreateUserService');
const createUserServiceMock = CreateUserService as jest.MockedClass<
  typeof CreateUserService
>;

describe('Create user controller test', () => {
  beforeEach(async () => {
    createUserServiceMock.mockClear();
  });

  it('Should be able to create a user', async () => {
    await createUserServiceMock.prototype.execute.mockResolvedValueOnce(
      new User(),
    );

    const response = await request(app).post(`/user`).send({
      email: 'example@example.com',
      password: '1234',
      name: 'User test',
    });

    expect(response.status).toEqual(201);
  });
});
