import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from '../../../categories/repositories/category.repository';
import { UserRepositoryInterface } from '../../../users/repositories/interfaces/user-repository.interface';
import { UserRepository } from '../../../users/repositories/user.repository';
import { CardEntity } from '../../entities/card.entity';
import { CardRepository } from '../../repositories/card.repository';
import { CardRepositoryInterface } from '../../repositories/interfaces/card-repository.interface';
import { CreateCardDTO } from './dtos/request/create-card-request.dto';

@Injectable()
export class CreateCardUseCase {
  constructor(
    @InjectRepository(CardRepository)
    private readonly cardRepository: CardRepositoryInterface,

    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepositoryInterface,

    @InjectRepository(CategoryRepository)
    private readonly categoryRepository: CategoryRepository,
  ) {}

  public async execute({
    user_id,
    description,
    title,
    status,
    category_ids,
  }: CreateCardDTO): Promise<CardEntity> {
    if (!user_id || !description || !title || !status) {
      throw new BadRequestException('Error in the creation of the card!');
    }

    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new NotFoundException('User does not exists!');
    }

    const categories = [];
    if (category_ids && category_ids?.length > 0) {
      for (const category_id of category_ids) {
        const category = await this.categoryRepository.findById(category_id);

        if (category) categories.push(category);
      }
    }

    const card = await this.cardRepository.createAndSave({
      status,
      title,
      description,
      user,
      categories,
    });

    return card;
  }
}
