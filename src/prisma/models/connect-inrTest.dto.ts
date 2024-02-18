import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ConnectInrTestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;
}
