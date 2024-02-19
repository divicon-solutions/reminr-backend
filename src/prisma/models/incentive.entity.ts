import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

export class Incentive {
  @ApiProperty()
  id: string;
  @ApiProperty({
    type: 'number',
    format: 'float',
  })
  amount: number;
  @ApiProperty()
  isRedeemed: boolean;
  @ApiProperty({
    type: 'number',
    format: 'float',
    nullable: true,
  })
  redeemedAmount: number | null;
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
