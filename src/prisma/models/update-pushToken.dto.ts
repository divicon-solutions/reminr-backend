import { Platform } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePushTokenDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  token?: string;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  apnToken?: string | null;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  device?: string;
  @ApiProperty({
    enum: Platform,
    required: false,
  })
  @IsOptional()
  platform?: Platform;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  identifier?: string;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  userId?: string;
}
