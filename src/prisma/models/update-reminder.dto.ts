import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateReminderDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  description?: string | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  acknowledgedAt?: Date | null;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsBoolean()
  status?: boolean | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  remindAt?: Date;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  medicationId?: string;
}
