import { container } from 'tsyringe';
import { CardRepository } from '../../../../../modules/cards/infra/typeorm/repositories/CardRepository';
import { ICardRepository } from '../../../../../modules/cards/repositories/ICardRepository';
import { CategoryRepository } from '../../../../../modules/categories/infra/typeorm/repositories/CategoryRepository';
import { ICategoryRepository } from '../../../../../modules/categories/repositories/ICategoryRepository';
import { UserRepository } from '../../../../../modules/users/infra/typeorm/repositories/UserRepository';
import { IUserRepository } from '../../../../../modules/users/repositories/IUserRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository,
);

container.registerSingleton<ICardRepository>('CardRepository', CardRepository);
