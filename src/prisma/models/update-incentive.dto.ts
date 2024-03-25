import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateIncentiveDto {
  @ApiProperty({
    type: 'number',
    format: 'float',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  amount?: number;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  userId?: string;
}
