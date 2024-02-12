import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { FindAllCardsDTO } from '../dtos/request/find-all-cards-request.dto';
import { CardEntity } from '../entities/card.entity';
import { CardRepositoryInterface } from './interfaces/card-repository.interface';

@Injectable()
export class CardRepository
  extends Repository<CardEntity>
  implements CardRepositoryInterface
{
  constructor(private readonly dataSource: DataSource) {
    super(CardEntity, dataSource.manager);
  }
  public async createAndSave(new_card: CardEntity): Promise<CardEntity> {
    const card: CardEntity = this.create(new_card);

    return await this.save(card);
  }
  public async updateAndSave(card: CardEntity): Promise<CardEntity> {
    return await this.save(card);
  }
  public async findById(id: string): Promise<CardEntity> {
    return this.dataSource
      .createQueryBuilder(CardEntity, 'card')
      .select('*')
      .where(`"card"."id" = '${id}'`)
      .getRawOne();
  }

  public async findAll({
    id,
    description,
    status,
    title,
    user_id,
  }: FindAllCardsDTO): Promise<CardEntity[]> {
    const query = this.dataSource
      .createQueryBuilder(CardEntity, 'Card')
      .leftJoinAndSelect('Card.categories', 'Category')
      .where(`Card.user_id = '${user_id}'`);

    if (description) {
      query.andWhere(`lower(Card.description) ilike '%${description}%'`);
    }

    if (status) {
      query.andWhere(`Card.status = '${status}'`);
    }

    if (title) {
      query.andWhere(`lower(Card.title) ilike '%${title}%'`);
    }

    if (id) {
      query.andWhere(`Card.id = '${id}'`);
    }

    return query.getMany();
  }

  public async deleteCard(card: CardEntity): Promise<void> {
    await this.remove(card);
  }
}
