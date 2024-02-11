import { dataSource } from '../../shared/infra/typeorm';

beforeAll(async () => {
  await dataSource.initialize();
});

afterAll(async () => {
  await dataSource.destroy();
});
