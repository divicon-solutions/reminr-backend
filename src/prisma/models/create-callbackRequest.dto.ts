import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class CreateCallbackRequestDto {
  @ApiProperty({
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isResolved?: boolean;
}
