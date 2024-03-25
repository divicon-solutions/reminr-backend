import { RedeemMethod, GiftCardType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateRedeemDto {
  @ApiProperty({
    type: 'number',
    format: 'float',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  amount?: number;
  @ApiProperty({
    enum: RedeemMethod,
    required: false,
  })
  @IsOptional()
  method?: RedeemMethod;
  @ApiProperty({
    enum: GiftCardType,
    required: false,
    nullable: true,
  })
  @IsOptional()
  giftCardType?: GiftCardType | null;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  giftCardCode?: string | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  processedAt?: Date | null;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  userId?: string;
}
