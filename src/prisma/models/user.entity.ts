import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { CallbackRequest } from './callbackRequest.entity';
import { PushToken } from './pushToken.entity';
import { Notification } from './notification.entity';

export class User {
  @ApiProperty()
  id: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  fullName: string;
  @ApiProperty({
    enum: Role,
  })
  role: Role;
  @ApiProperty({
    nullable: true,
  })
  phoneNumber: string | null;
  @ApiProperty()
  stickyReminder: boolean;
  @ApiProperty()
  isVerified: boolean;
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
  @ApiProperty({
    type: () => CallbackRequest,
    isArray: true,
    required: false,
  })
  callbackRequests?: CallbackRequest[];
  @ApiProperty({
    type: () => PushToken,
    isArray: true,
    required: false,
  })
  pushTokens?: PushToken[];
  @ApiProperty({
    type: () => Notification,
    isArray: true,
    required: false,
  })
  notifications?: Notification[];
}
