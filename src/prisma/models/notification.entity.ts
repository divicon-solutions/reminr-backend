import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

export class Notification {
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
