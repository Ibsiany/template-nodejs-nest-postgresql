import { v4 as uuidv4 } from 'uuid';
import { User } from '../../../users/infra/typeorm/entities/User';
import { ICreateCategoryDTO } from '../../dtos/ICreateCategoryDTO';
import { Category } from '../../infra/typeorm/entities/Category';
import { ICategoryRepository } from '../ICategoryRepository';

export class CategoryRepositoryInMemory implements ICategoryRepository {
  categories: Category[] = [];

  async create({ name, color, user }: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();

    Object.assign(user || new User(), {
      ...user,
    });

    Object.assign(category, {
      id: uuidv4(),
      name,
      color,
      user,
      user_id: user.id,
    });

    this.categories.push(category);

    return category;
  }

  async findAll(user_id: string, name?: string): Promise<Category[]> {
    return name
      ? this.categories.filter(
          category =>
            category.user_id === user_id && category.name.includes(name),
        )
      : this.categories.filter(category => category.user_id === user_id);
  }

  async findById(id: string): Promise<Category | null> {
    return this.categories.find(category => category.id === id) || null;
  }

  async delete(user: Category): Promise<void> {
    this.categories.splice(this.categories.indexOf(user));
  }
}
