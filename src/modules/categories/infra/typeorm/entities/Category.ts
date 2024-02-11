import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Card } from '../../../../cards/infra/typeorm/entities/Card';
import { User } from '../../../../users/infra/typeorm/entities/User';

@Entity('Category')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, user => user.cards)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => Card, card => card.categories)
  cards: Card[];
}
