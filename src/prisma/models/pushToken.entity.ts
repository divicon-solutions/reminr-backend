import { Platform } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

export class PushToken {
  @ApiProperty()
  id: string;
  @ApiProperty()
  token: string;
  @ApiProperty({
    nullable: true,
  })
  apnToken: string | null;
  @ApiProperty()
  device: string;
  @ApiProperty({
    enum: Platform,
  })
  platform: Platform;
  @ApiProperty()
  identifier: string;
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
