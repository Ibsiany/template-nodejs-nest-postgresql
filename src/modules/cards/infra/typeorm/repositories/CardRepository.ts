import { Repository } from 'typeorm';
import { dataSource } from '../../../../../shared/infra/typeorm';
import { ICreateCardDTO } from '../../../dtos/ICreateCardDTO';
import { IGetAllCardsDTO } from '../../../dtos/IGetAllCardsDTO';
import { ICardRepository } from '../../../repositories/ICardRepository';
import { Card } from '../entities/Card';

export class CardRepository implements ICardRepository {
  private ormRepository: Repository<Card>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Card);
  }

  async create(new_card: ICreateCardDTO): Promise<Card> {
    const card = this.ormRepository.create(new_card);

    return this.ormRepository.save(card);
  }

  async update(card: Card): Promise<Card> {
    return this.ormRepository.save(card);
  }

  async findById(id: string): Promise<Card | null> {
    return this.ormRepository.findOne({
      where: { id },
    });
  }

  async findAll({
    id,
    description,
    status,
    title,
    user_id,
  }: IGetAllCardsDTO): Promise<Card[]> {
    const query = this.ormRepository
      .createQueryBuilder('cards')
      .innerJoin('cards.user', 'user', 'user.id = cards.user_id')
      .where(`user.id = '${user_id}'`);

    if (id) {
      query.andWhere('cards.id = :id', { id });
    }

    if (description) {
      query.andWhere(`lower(cards.description) ilike '%${description}%'`);
    }

    if (status) {
      query.andWhere('cards.status = :status', { status });
    }

    if (title) {
      query.andWhere(`lower(cards.title) ilike '%${title}%'`);
    }

    return query.getMany();
  }

  async delete(cards: Card): Promise<void> {
    await this.ormRepository.remove(cards);
  }
}
