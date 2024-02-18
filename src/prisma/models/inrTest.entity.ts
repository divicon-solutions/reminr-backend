import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

export class InrTest {
  @ApiProperty()
  id: string;
  @ApiProperty({
    type: 'number',
    format: 'float',
  })
  inrValue: number;
  @ApiProperty({
    nullable: true,
  })
  remarks: string | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  date: Date;
  @ApiProperty({
    nullable: true,
  })
  verificationImage: string | null;
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
