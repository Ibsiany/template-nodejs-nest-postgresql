import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../../../categories/infra/typeorm/entities/Category';
import { User } from '../../../../users/infra/typeorm/entities/User';

@Entity('Cards')
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  status: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, user => user.cards)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => Category, category => category.cards)
  @JoinTable({
    name: 'CardCategory',
    joinColumn: {
      name: 'card_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
  })
  categories: Category[];
}
