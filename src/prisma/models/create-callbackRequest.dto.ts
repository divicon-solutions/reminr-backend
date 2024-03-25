import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCallbackRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;
  @ApiProperty({
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isResolved?: boolean;
}
