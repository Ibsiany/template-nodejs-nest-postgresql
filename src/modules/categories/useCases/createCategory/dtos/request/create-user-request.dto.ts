import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateyCategorDTO {
  @ApiProperty({
    type: 'string',
    description: 'User name',
    example: 'Test',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    type: 'string',
    description: 'Color name',
    example: 'red',
  })
  @IsString()
  readonly color: string;
}
