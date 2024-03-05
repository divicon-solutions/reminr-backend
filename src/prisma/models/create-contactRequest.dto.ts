import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateContactRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  phoneNumber?: string | null;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  message: string;
  @ApiProperty({
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isResolved?: boolean;
}
