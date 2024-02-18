import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ConnectWellnessScoreDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;
}
