import { ICreateCardDTO } from '../dtos/ICreateCardDTO';
import { IGetAllCardsDTO } from '../dtos/IGetAllCardsDTO';
import { Card } from '../infra/typeorm/entities/Card';

export interface ICardRepository {
  create(new_play: ICreateCardDTO): Promise<Card>;
  update(user: Card): Promise<Card>;
  findById(id: string): Promise<Card | null>;
  findAll(query: IGetAllCardsDTO): Promise<Card[]>;
  delete(user: Card): Promise<void>;
}
