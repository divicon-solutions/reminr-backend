import { ApiProperty } from '@nestjs/swagger';
import { Incentive } from './incentive.entity';
import { Redeem } from './redeem.entity';

export class IncentivesOnRedeems {
  @ApiProperty()
  incentiveId: string;
  @ApiProperty()
  redeemId: string;
  @ApiProperty({
    type: () => Incentive,
    required: false,
  })
  incentive?: Incentive;
  @ApiProperty({
    type: () => Redeem,
    required: false,
  })
  redeem?: Redeem;
}
