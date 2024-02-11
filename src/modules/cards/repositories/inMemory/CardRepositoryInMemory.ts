import { v4 as uuidv4 } from 'uuid';
import { User } from '../../../users/infra/typeorm/entities/User';
import { ICreateCardDTO } from '../../dtos/ICreateCardDTO';
import { IGetAllCardsDTO } from '../../dtos/IGetAllCardsDTO';
import { Card } from '../../infra/typeorm/entities/Card';
import { ICardRepository } from '../ICardRepository';

export class CardRepositoryInMemory implements ICardRepository {
  cards: Card[] = [];

  async create({
    description,
    status,
    title,
    user,
  }: ICreateCardDTO): Promise<Card> {
    const card = new Card();

    Object.assign(user || new User(), {
      ...user,
    });

    Object.assign(card, {
      id: uuidv4(),
      description,
      status,
      title,
      user,
      user_id: user?.id,
    });

    this.cards.push(card);

    return card;
  }

  async update(card: Card): Promise<Card> {
    const oldCard = this.cards.find(foundCard => foundCard.id === card.id);

    if (oldCard) {
      Object.assign(oldCard, card);
    } else {
      this.cards.push(card);
    }

    return card;
  }

  async findById(id: string): Promise<Card | null> {
    return this.cards.find(card => card.id === id) || null;
  }

  async findAll({
    user_id,
    status,
    title,
    description,
    id,
  }: IGetAllCardsDTO): Promise<Card[]> {
    let findCards = this.cards.filter(card => card.user_id === user_id);

    if (status) {
      findCards = this.cards.filter(card => card.status === status);
    }

    if (title) {
      findCards = this.cards.filter(card => card.title.includes(title));
    }

    if (description) {
      findCards = this.cards.filter(card =>
        card.description.includes(description),
      );
    }

    if (id) {
      findCards = this.cards.filter(card => card.id === id);
    }

    return findCards;
  }

  async delete(card: Card): Promise<void> {
    this.cards.splice(this.cards.indexOf(card));
  }
}
