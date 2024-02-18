import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class IncentivesOnRedeemsIncentiveIdRedeemIdUniqueInputDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  incentiveId: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  redeemId: string;
}

@ApiExtraModels(IncentivesOnRedeemsIncentiveIdRedeemIdUniqueInputDto)
export class ConnectIncentivesOnRedeemsDto {
  @ApiProperty({
    type: IncentivesOnRedeemsIncentiveIdRedeemIdUniqueInputDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => IncentivesOnRedeemsIncentiveIdRedeemIdUniqueInputDto)
  incentiveId_redeemId: IncentivesOnRedeemsIncentiveIdRedeemIdUniqueInputDto;
}
