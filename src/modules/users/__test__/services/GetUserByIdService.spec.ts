import { User } from '../../infra/typeorm/entities/User';
import { IUserRepository } from '../../repositories/IUserRepository';
import { UserRepositoryInMemory } from '../../repositories/inMemory/UserRepositoryInMemory';
import { GetUserByIdService } from '../../services/GetUserByIdService';

describe('Get user by id service', () => {
  let userRepositoryInMemory: IUserRepository;
  let getUserByIdService: GetUserByIdService;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    getUserByIdService = new GetUserByIdService(userRepositoryInMemory);
  });

  it('should be able to get user by id', async () => {
    const user: User = {
      email: 'example@example.com',
      password: '1234',
      name: 'User test',
    } as User;

    const userCreated = (await userRepositoryInMemory.create(user)) as User;

    const findUser = await getUserByIdService.execute(userCreated?.id);

    expect(findUser.id).toEqual(userCreated.id);
    expect(findUser.name).toEqual(user.name);
    expect(findUser.email).toEqual(user.email);
  });
});
