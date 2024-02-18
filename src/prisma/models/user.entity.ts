import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Medication } from './medication.entity';
import { InrTest } from './inrTest.entity';
import { WellnessScore } from './wellnessScore.entity';
import { Incentive } from './incentive.entity';
import { Redeem } from './redeem.entity';

export class User {
  @ApiProperty()
  id: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  fullName: string;
  @ApiProperty({
    enum: Role,
  })
  role: Role;
  @ApiProperty()
  phoneNumber: string;
  @ApiProperty()
  stickyReminder: boolean;
  @ApiProperty()
  isVerified: boolean;
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
  @ApiProperty({
    type: () => Medication,
    isArray: true,
    required: false,
  })
  medications?: Medication[];
  @ApiProperty({
    type: () => InrTest,
    isArray: true,
    required: false,
  })
  inrTests?: InrTest[];
  @ApiProperty({
    type: () => WellnessScore,
    isArray: true,
    required: false,
  })
  scores?: WellnessScore[];
  @ApiProperty({
    type: () => Incentive,
    isArray: true,
    required: false,
  })
  incentives?: Incentive[];
  @ApiProperty({
    type: () => Redeem,
    isArray: true,
    required: false,
  })
  redeems?: Redeem[];
}
