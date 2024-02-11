import { User } from '../../users/infra/typeorm/entities/User';

export interface ICreateCategoryDTO {
  name: string;
  color: string;
  user: User;
}
