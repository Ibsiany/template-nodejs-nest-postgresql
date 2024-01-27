import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ICreateUserDTO } from '../../../dtos/request/create-user-request.dto';
import { UserEntity } from '../../../entities/user.entity';
import { UserRepository } from '../../../repositories/user.repository';
import { CreateUserUseCase } from '../create-user.usecase';

describe('Create user UseCase', () => {
  let createUserUseCase: CreateUserUseCase, repository: UserRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: getRepositoryToken(UserRepository),
          useValue: {
            findByEmail: jest.fn(),
            createAndSave: jest.fn(),
          },
        },
      ],
    }).compile();

    createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase);

    repository = await module.resolve<UserRepository>(
      getRepositoryToken(UserRepository),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', async () => {
    expect(createUserUseCase).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('Should be able to create user', async () => {
    const user = {
      name: 'Test User',
      email: 'test@example.com',
      password: '******',
    } as ICreateUserDTO;

    const userCreated = Object.assign(user, { id: '1' }) as UserEntity;

    const findByEmailUserSpy = jest
      .spyOn(repository, 'findByEmail')
      .mockResolvedValueOnce(null);

    const createAndSaveUserSpy = jest
      .spyOn(repository, 'createAndSave')
      .mockResolvedValueOnce(userCreated);

    const result = await createUserUseCase.execute(user);

    expect(result.id).toEqual(userCreated.id);
    expect(findByEmailUserSpy).toHaveBeenCalledWith(user.email);
    expect(createAndSaveUserSpy).toHaveBeenCalled();
  });
});
