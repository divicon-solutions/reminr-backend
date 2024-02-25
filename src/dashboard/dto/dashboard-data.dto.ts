import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';

class TakenMedicationDto {
  @IsUUID()
  id: string;

  @IsDateString()
  remindAt: Date;

  @IsDateString()
  acknowledgedAt: Date;
}

class CompletedInrTest {
  @IsUUID()
  id: string;

  @IsDateString()
  date: Date;

  @IsNumber()
  inrValue: number;
}

export class DashboardDataDto {
  @IsOptional()
  @IsNumber()
  wellnessScore: number | null;

  @IsNumber()
  incentiveAmount: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TakenMedicationDto)
  takenMedications: TakenMedicationDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CompletedInrTest)
  inrTests: CompletedInrTest[];
}
