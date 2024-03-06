import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  body: string;
  @ApiProperty({
    type: () => Object,
    required: false,
    nullable: true,
  })
  @IsOptional()
  data?: Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;
}
