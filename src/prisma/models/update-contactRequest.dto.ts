import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateContactRequestDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  firstName?: string;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  lastName?: string;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  email?: string;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  phoneNumber?: string | null;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  message?: string;
  @ApiProperty({
    default: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isResolved?: boolean;
}
