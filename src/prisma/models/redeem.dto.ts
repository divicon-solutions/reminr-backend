import { RedeemMethod } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class RedeemDto {
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
