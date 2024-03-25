import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateCallbackRequestDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  userId?: string;
  @ApiProperty({
    default: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isResolved?: boolean;
}
