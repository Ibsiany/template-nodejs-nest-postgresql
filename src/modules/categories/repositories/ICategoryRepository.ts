import { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO';
import { Category } from '../infra/typeorm/entities/Category';

export interface ICategoryRepository {
  create(nnew_category: ICreateCategoryDTO): Promise<Category>;
  findAll(user_id: string, name?: string): Promise<Category[]>;
  findById(id: string): Promise<Category | null>;
  delete(category: Category): Promise<void>;
}
