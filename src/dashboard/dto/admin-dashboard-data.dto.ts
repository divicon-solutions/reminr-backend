import { MedicationDto } from '@app/prisma';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class AdminDashboardDataDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MedicationDto)
  takenMedications: MedicationDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MedicationDto)
  skippedMedications: MedicationDto[];
}
