import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ConnectNotificationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;
}
