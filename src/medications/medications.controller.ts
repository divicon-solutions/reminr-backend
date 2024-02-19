import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { CreateMedicationDto, MedicationDto, UpdateMedicationDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiSuccessResponse, CurrentUser } from '@app/shared';

@ApiTags('medications')
@Controller('medications')
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @ApiSuccessResponse(MedicationDto, { status: 201 })
  @Post()
  async create(
    @Body() createMedicationDto: CreateMedicationDto,
    @CurrentUser() user,
  ) {
    const result = await this.medicationsService.create(
      createMedicationDto,
      user,
    );
    return { message: 'Medication created', result };
  }

  @Get()
  findAll(@CurrentUser() user) {
    return this.medicationsService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user) {
    return this.medicationsService.findOne(id, user);
  }

  @ApiSuccessResponse(MedicationDto)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMedicationDto: UpdateMedicationDto,
    @CurrentUser() user,
  ) {
    const result = await this.medicationsService.update(
      id,
      updateMedicationDto,
      user,
    );
    return { message: 'Medication updated', result };
  }

  @ApiSuccessResponse()
  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser() user) {
    await this.medicationsService.remove(id, user);
    return { message: 'Medication deleted' };
  }
}
