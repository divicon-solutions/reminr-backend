import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ConnectContactRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;
}
