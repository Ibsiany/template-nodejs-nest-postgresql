import request from 'supertest';
import { app } from '../../../../shared/infra/http/app';
import { Card } from '../../infra/typeorm/entities/Card';
import { CreateCardService } from '../../services/CreateCardService';

jest.mock('../../services/CreateCardService');
const createCardServiceMock = CreateCardService as jest.MockedClass<
  typeof CreateCardService
>;

describe('Create card controller test', () => {
  beforeEach(async () => {
    createCardServiceMock.mockClear();
  });

  it('Should be able to create a card', async () => {
    await createCardServiceMock.prototype.execute.mockResolvedValueOnce(
      new Card(),
    );

    const response = await request(app).post(`/card/uuid`).send({
      status: '10',
      title: 'Test',
      description: 'Test card',
      user_id: 'uuid',
    });

    expect(response.status).toEqual(201);
  });
});
