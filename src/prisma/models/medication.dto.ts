import { Frequency, Day } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class MedicationDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty({
    enum: Frequency,
  })
  frequency: Frequency;
  @ApiProperty({
    enum: Day,
  })
  specificDays: Day[];
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    nullable: true,
  })
  intervalCount: number | null;
  @ApiProperty({
    nullable: true,
  })
  intervalUnit: string | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  startDate: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  updatedAt: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  deletedAt: Date | null;
}
