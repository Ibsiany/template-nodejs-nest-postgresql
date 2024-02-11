import { UserEntity } from '../../../users/entities/user.entity';
import { CategoryEntity } from '../../entities/category.entity';
import { CreateyCategorDTO } from '../../useCases/createCategory/dtos/request/create-user-request.dto';

export interface CategoryRepositoryInterface {
  createAndSave(
    data: CreateyCategorDTO,
    user: UserEntity,
  ): Promise<CategoryEntity>;
  findAll(user_id: string, name?: string): Promise<CategoryEntity[]>;
  findById(id: string): Promise<CategoryEntity>;
  deleteCategory(category: CategoryEntity): Promise<void>;
}
