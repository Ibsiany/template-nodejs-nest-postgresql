import request from 'supertest';
import { app } from '../../../../shared/infra/http/app';
import { User } from '../../infra/typeorm/entities/User';
import { SessionService } from '../../services/SessionService';

jest.mock('../../services/SessionService');
const sessionServiceMock = SessionService as jest.MockedClass<
  typeof SessionService
>;

describe('Session controller', () => {
  beforeEach(async () => {
    sessionServiceMock.mockClear();
  });

  it('Should be able to session user', async () => {
    const user = new User();

    sessionServiceMock.prototype.execute.mockResolvedValueOnce({
      user,
      token: 'token',
    });

    const response = await request(app).post(`/user/session`);

    expect(response.body).toHaveProperty('token');
    expect(response.status).toEqual(200);
  });
});
