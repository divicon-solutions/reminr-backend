import { RedeemMethod, GiftCardType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateRedeemDto {
  @ApiProperty({
    type: 'number',
    format: 'float',
  })
  @IsNotEmpty()
  @IsNumber()
  amount: number;
  @ApiProperty({
    enum: RedeemMethod,
  })
  @IsNotEmpty()
  method: RedeemMethod;
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
}
