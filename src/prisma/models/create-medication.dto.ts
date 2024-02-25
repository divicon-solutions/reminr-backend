import { Frequency, Day, IntervalUnit } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMedicationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
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
  })
  @IsNotEmpty()
  @IsInt()
  noOfPills: number;
  @ApiProperty({
    enum: Frequency,
  })
  @IsNotEmpty()
  frequency: Frequency;
  @ApiProperty({
    enum: Day,
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
  })
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  @IsNotEmpty()
  @IsDateString()
  time: Date;
}
