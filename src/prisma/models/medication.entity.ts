import { Frequency, Day, IntervalUnit } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

export class Medication {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  dosage: string;
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
    enum: IntervalUnit,
    nullable: true,
  })
  intervalUnit: IntervalUnit | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  startDate: Date;
  @ApiProperty()
  userId: string;
  @ApiProperty({
    type: () => User,
    required: false,
  })
  user?: User;
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
