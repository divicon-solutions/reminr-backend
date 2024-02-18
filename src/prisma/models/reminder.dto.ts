import { ApiProperty } from '@nestjs/swagger';

export class ReminderDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty({
    nullable: true,
  })
  description: string | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  acknowledgedAt: Date | null;
  @ApiProperty({
    nullable: true,
  })
  status: boolean | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  remindAt: Date;
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
