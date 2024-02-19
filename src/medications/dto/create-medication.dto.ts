import { CreateMedicationDto as Base } from '@app/prisma';
import { ApiProperty } from '@nestjs/swagger';
import { Day, IntervalUnit } from '@prisma/client';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsInt,
  IsPositive,
  ValidateIf,
} from 'class-validator';

export class CreateMedicationDto extends Base {
  @ValidateIf((o) => o.frequency === 'SPECIFIC_DAYS')
  @ApiProperty({ isArray: true, enum: Day })
  @ArrayNotEmpty()
  @IsArray()
  @IsEnum(Day, { each: true })
  specificDays?: Day[];

  @ValidateIf((o) => o.frequency === 'DAYS_INTERVAL')
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    required: false,
    nullable: true,
  })
  @IsPositive()
  @IsInt()
  intervalCount?: number | null;

  @ValidateIf((o) => o.frequency === 'DAYS_INTERVAL')
  @ApiProperty({
    enum: IntervalUnit,
    required: false,
    nullable: true,
  })
  @IsEnum(IntervalUnit)
  intervalUnit?: IntervalUnit | null;
}
