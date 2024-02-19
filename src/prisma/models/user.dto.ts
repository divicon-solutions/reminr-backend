import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
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
}
