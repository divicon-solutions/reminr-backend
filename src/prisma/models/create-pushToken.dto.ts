import { Platform } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePushTokenDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  token: string;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  apnToken?: string | null;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  device: string;
  @ApiProperty({
    enum: Platform,
  })
  @IsNotEmpty()
  platform: Platform;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  identifier: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;
}
