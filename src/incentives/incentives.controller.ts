import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { IncentivesService } from './incentives.service';
import {
  IncentiveDto,
  CreateIncentiveDto,
  UpdateIncentiveDto,
} from '@app/prisma';
import { ApiSuccessResponse, CurrentUser } from '@app/shared';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('incentives')
@Controller('incentives')
export class IncentivesController {
  constructor(private readonly incentivesService: IncentivesService) {}

  @ApiSuccessResponse(IncentiveDto, { status: 201 })
  @Post()
  async create(
    @Body() createIncentiveDto: CreateIncentiveDto,
    @CurrentUser() user,
  ) {
    const result = await this.incentivesService.create(
      createIncentiveDto,
      user,
    );
    return { message: 'Incentive created', result };
  }

  @ApiQuery({ name: 'userId', required: false })
  @Get()
  findAll(@CurrentUser() user, @Query('userId') userId?: string) {
    return this.incentivesService.findAll(user, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user) {
    return this.incentivesService.findOne(id, user);
  }

  @ApiSuccessResponse(IncentiveDto)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateIncentiveDto: UpdateIncentiveDto,
    @CurrentUser() user,
  ) {
    const result = await this.incentivesService.update(
      id,
      updateIncentiveDto,
      user,
    );
    return { message: 'Incentive updated', result };
  }

  @ApiSuccessResponse()
  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser() user) {
    await this.incentivesService.remove(id, user);
    return { message: 'Incentive deleted' };
  }
}
