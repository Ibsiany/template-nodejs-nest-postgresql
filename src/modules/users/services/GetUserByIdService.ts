import { inject, injectable } from 'tsyringe';
import LibError from '../../../shared/errors/LibError';
import { User } from '../infra/typeorm/entities/User';
import { IUserRepository } from '../repositories/IUserRepository';

@injectable()
export class GetUserByIdService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new LibError('User does not existits!', 404);
    }

    return user;
  }
}
