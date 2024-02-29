import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CategoryEntity } from '../../../categories/entities/category.entity';
import { UserEntity } from '../../../users/entities/user.entity';

export class CreateAndSaveCardDTO {
  @ApiProperty({
    type: 'string',
    description: 'Description card',
    example: 'create crud',
  })
  @IsString()
  readonly description: string;

  @ApiProperty({
    type: 'string',
    description: 'Status card',
    example: '10',
  })
  @IsString()
  readonly status: string;

  @ApiProperty({
    type: 'string',
    description: 'Title card',
    example: 'Create CRUD',
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    type: 'string',
    description: 'User',
  })
  @IsString()
  readonly user: UserEntity;

  @ApiPropertyOptional({
    type: CategoryEntity,
    description: 'Category',
  })
  @IsOptional()
  readonly categories: CategoryEntity[];
}
