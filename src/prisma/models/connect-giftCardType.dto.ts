import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ConnectGiftCardTypeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;
}
