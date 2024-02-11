import { Repository } from 'typeorm';
import { dataSource } from '../../../../../shared/infra/typeorm';
import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO';
import { IUserRepository } from '../../../repositories/IUserRepository';
import { User } from '../entities/User';

export class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = dataSource.getRepository(User);
  }

  async create(new_user: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(new_user);

    return this.ormRepository.save(user);
  }

  async update(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.ormRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.ormRepository.findOne({ where: { id } });
  }

  async delete(user: User): Promise<void> {
    await this.ormRepository.remove(user);
  }
}
