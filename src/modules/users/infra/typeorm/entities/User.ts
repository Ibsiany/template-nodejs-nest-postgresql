import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Card } from '../../../../cards/infra/typeorm/entities/Card';
import { Category } from '../../../../categories/infra/typeorm/entities/Category';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  photo: string;

  @OneToMany(() => Card, cards => cards.user)
  cards: Card[];

  @OneToMany(() => Category, categories => categories.user)
  categories: Category[];
}
