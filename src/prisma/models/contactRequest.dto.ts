import { ApiProperty } from '@nestjs/swagger';

export class ContactRequestDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  email: string;
  @ApiProperty({
    nullable: true,
  })
  phoneNumber: string | null;
  @ApiProperty({
    nullable: true,
  })
  message: string | null;
  @ApiProperty()
  isResolved: boolean;
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
