import { inject, injectable } from 'tsyringe';
import LibError from '../../../shared/errors/LibError';
import { IUserRepository } from '../../users/repositories/IUserRepository';
import { ICreateCardServiceDTO } from '../dtos/ICreateCardServiceDTO';
import { Card } from '../infra/typeorm/entities/Card';
import { ICardRepository } from '../repositories/ICardRepository';

@injectable()
export class CreateCardService {
  constructor(
    @inject('CardRepository')
    private cardRepository: ICardRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({
    user_id,
    description,
    title,
    status,
  }: ICreateCardServiceDTO): Promise<Card> {
    if (!user_id || !description || !title || !status) {
      throw new LibError('Error in the creation of the card!');
    }

    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new LibError('User does not exists!', 404);
    }

    const card = await this.cardRepository.create({
      status,
      title,
      description,
      user,
    });

    return card;
  }
}
