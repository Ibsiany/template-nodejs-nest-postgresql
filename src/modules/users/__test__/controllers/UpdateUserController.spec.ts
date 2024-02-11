import request from 'supertest';
import { app } from '../../../../shared/infra/http/app';
import { User } from '../../infra/typeorm/entities/User';
import { UpdateUserService } from '../../services/UpdateUserService';

jest.mock('../../services/UpdateUserService');
const updateUserServiceMock = UpdateUserService as jest.MockedClass<
  typeof UpdateUserService
>;

describe('Update user controller test', () => {
  beforeEach(async () => {
    updateUserServiceMock.mockClear();
  });

  it('Should be able to update a user', async () => {
    await updateUserServiceMock.prototype.execute.mockResolvedValueOnce(
      new User(),
    );

    const response = await request(app).patch(`/user`).send({
      email: 'example@example.com',
      password: '1234',
      name: 'User test',
    });

    expect(response.status).toEqual(201);
  });
});
