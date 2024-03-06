import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class NotificationDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  body: string;
  @ApiProperty({
    type: () => Object,
    nullable: true,
  })
  data: Prisma.JsonValue | null;
  @ApiProperty()
  userId: string;
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
