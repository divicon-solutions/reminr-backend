import { ApiProperty } from '@nestjs/swagger';
import { Redeem } from './redeem.entity';

export class GiftCardType {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
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
    type: () => Redeem,
    isArray: true,
    required: false,
  })
  redeems?: Redeem[];
}
