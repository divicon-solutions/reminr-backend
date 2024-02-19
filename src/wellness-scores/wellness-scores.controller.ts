import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { WellnessScoresService } from './wellness-scores.service';
import {
  WellnessScoreDto,
  CreateWellnessScoreDto,
  UpdateWellnessScoreDto,
} from '@app/prisma';
import { ApiSuccessResponse, CurrentUser } from '@app/shared';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('wellness-scores')
@Controller('wellness-scores')
export class WellnessScoresController {
  constructor(private readonly wellnessScoresService: WellnessScoresService) {}

  @ApiSuccessResponse(WellnessScoreDto, { status: 201 })
  @Post()
  async create(
    @Body() createWellnessScoreDto: CreateWellnessScoreDto,
    @CurrentUser() user,
  ) {
    const result = await this.wellnessScoresService.create(
      createWellnessScoreDto,
      user,
    );
    return { message: 'WellnessScore created', result };
  }

  @Get()
  findAll(@CurrentUser() user) {
    return this.wellnessScoresService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user) {
    return this.wellnessScoresService.findOne(id, user);
  }

  @ApiSuccessResponse(WellnessScoreDto)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWellnessScoreDto: UpdateWellnessScoreDto,
    @CurrentUser() user,
  ) {
    const result = await this.wellnessScoresService.update(
      id,
      updateWellnessScoreDto,
      user,
    );
    return { message: 'WellnessScore updated', result };
  }

  @ApiSuccessResponse()
  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser() user) {
    await this.wellnessScoresService.remove(id, user);
    return { message: 'WellnessScore deleted' };
  }
}
