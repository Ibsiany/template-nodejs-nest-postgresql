import LibError from '../../../../shared/errors/LibError';
import { User } from '../../infra/typeorm/entities/User';
import { IUserRepository } from '../../repositories/IUserRepository';
import { UserRepositoryInMemory } from '../../repositories/inMemory/UserRepositoryInMemory';
import { CreateUserService } from '../../services/CreateUserService';
import { SessionService } from '../../services/SessionService';

describe('Get user by id service', () => {
  let userRepositoryInMemory: IUserRepository;
  let sessionService: SessionService;
  let createUserService: CreateUserService;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserService = new CreateUserService(userRepositoryInMemory);
    sessionService = new SessionService(userRepositoryInMemory);
  });

  it('should be able to authenticate', async () => {
    const user: User = {
      email: 'example@example.com',
      password: '1234',
      name: 'User test',
    } as User;

    const userCreated = (await createUserService.execute(user)) as User;

    const session = await sessionService.execute(user.email, user.password);

    expect(session.user.id).toEqual(userCreated.id);
    expect(session).toHaveProperty('token');
  });

  it('should not be able to authenticate with email does not exists', async () => {
    await expect(
      sessionService.execute('example@example.com', '1234'),
    ).rejects.toEqual(new LibError('Incorrect email/password'));
  });

  it('should not be able to authenticate with password incorrect', async () => {
    const user: User = {
      email: 'example@example.com',
      password: '1234',
      name: 'User test',
    } as User;

    await createUserService.execute(user);

    await expect(sessionService.execute(user.email, '')).rejects.toEqual(
      new LibError('Incorrect email/password'),
    );
  });
});
