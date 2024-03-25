import { ApiProperty } from '@nestjs/swagger';

export class WellnessScoreDto {
  @ApiProperty()
  id: string;
  @ApiProperty({
    type: 'number',
    format: 'float',
  })
  score: number;
  @ApiProperty({
    nullable: true,
  })
  remarks: string | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  date: Date;
  @ApiProperty()
  userId: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  updatedAt: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  deletedAt: Date | null;
}
