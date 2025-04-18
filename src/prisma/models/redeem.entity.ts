import { RedeemMethod } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { GiftCardType } from './giftCardType.entity';
import { User } from './user.entity';

export class Redeem {
  @ApiProperty()
  id: string;
  @ApiProperty({
    type: 'number',
    format: 'float',
  })
  amount: number;
  @ApiProperty({
    enum: RedeemMethod,
  })
  method: RedeemMethod;
  @ApiProperty({
    nullable: true,
  })
  giftCardTypeId: string | null;
  @ApiProperty({
    type: () => GiftCardType,
    required: false,
    nullable: true,
  })
  giftCardType?: GiftCardType | null;
  @ApiProperty({
    nullable: true,
  })
  giftCardCode: string | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  processedAt: Date | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  expiryAt: Date | null;
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
