import { MedicationDto as Base } from '@app/prisma';
import { ApiProperty } from '@nestjs/swagger';
import { Day } from '@prisma/client';
import { IsArray } from 'class-validator';

export class MedicationDto extends Base {
  @ApiProperty({ isArray: true, enum: Day })
  @IsArray()
  specificDays: Day[];
}
