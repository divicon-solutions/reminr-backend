import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ConnectReminderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;
}
