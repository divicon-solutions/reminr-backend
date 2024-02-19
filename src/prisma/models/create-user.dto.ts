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
  @ApiProperty({
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  phoneNumber?: string | null;
  @ApiProperty({
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  stickyReminder?: boolean;
}
