import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateIncentiveDto {
  @ApiProperty({
    type: 'number',
    format: 'float',
  })
  @IsNotEmpty()
  @IsNumber()
  amount: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;
}
