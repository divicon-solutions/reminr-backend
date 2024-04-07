import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGiftCardTypeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}
