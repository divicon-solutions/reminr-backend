import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ConnectPushTokenDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;
}
