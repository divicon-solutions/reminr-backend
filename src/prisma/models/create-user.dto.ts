import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    default: 'uuid',
  })
  @IsOptional()
  @IsString()
  id?: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fullName: string;
  @ApiProperty({
    enum: Role,
    default: 'USER',
  })
  @IsOptional()
  role?: Role;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;
  @ApiProperty({
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  stickyReminder?: boolean;
}
