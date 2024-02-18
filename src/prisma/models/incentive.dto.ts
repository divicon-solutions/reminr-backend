import { ApiProperty } from '@nestjs/swagger';

export class IncentiveDto {
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
