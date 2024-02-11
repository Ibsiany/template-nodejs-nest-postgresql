import { inject, injectable } from 'tsyringe';
import { IGetAllCardsDTO } from '../dtos/IGetAllCardsDTO';
import { Card } from '../infra/typeorm/entities/Card';
import { ICardRepository } from '../repositories/ICardRepository';

@injectable()
export class GetCardsService {
  constructor(
    @inject('CardRepository')
    private cardRepository: ICardRepository,
  ) {}

  async execute(query: IGetAllCardsDTO): Promise<Card[]> {
    return this.cardRepository.findAll(query);
  }
}
