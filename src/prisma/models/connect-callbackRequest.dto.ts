import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ConnectCallbackRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;
}
