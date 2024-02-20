import { Frequency, Day, IntervalUnit } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateMedicationDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  dosage?: string | null;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    required: false,
  })
  @IsOptional()
  @IsInt()
  noOfPills?: number;
  @ApiProperty({
    enum: Frequency,
    required: false,
  })
  @IsOptional()
  frequency?: Frequency;
  @ApiProperty({
    enum: Day,
    required: false,
  })
  @IsOptional()
  @IsArray()
  specificDays?: Day[];
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsInt()
  intervalCount?: number | null;
  @ApiProperty({
    enum: IntervalUnit,
    required: false,
    nullable: true,
  })
  @IsOptional()
  intervalUnit?: IntervalUnit | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  startDate?: Date;
}
