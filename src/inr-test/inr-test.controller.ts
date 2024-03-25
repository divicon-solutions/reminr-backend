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
import { InrTestService } from './inr-test.service';
import { InrTestDto, CreateInrTestDto, UpdateInrTestDto } from '@app/prisma';
import { ApiSuccessResponse, CurrentUser } from '@app/shared';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('inr-test')
@Controller('inr-test')
export class InrTestController {
  constructor(private readonly inrTestService: InrTestService) {}

  @ApiSuccessResponse(InrTestDto, { status: 201 })
  @Post()
  async create(
    @Body() createInrTestDto: CreateInrTestDto,
    @CurrentUser() user,
  ) {
    const result = await this.inrTestService.create(createInrTestDto, user);
    return { message: 'InrTest created', result };
  }

  @ApiQuery({ name: 'userId', required: false })
  @Get()
  findAll(@CurrentUser() user, @Query('userId') userId?: string) {
    return this.inrTestService.findAll(user, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user) {
    return this.inrTestService.findOne(id, user);
  }

  @ApiSuccessResponse(InrTestDto)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateInrTestDto: UpdateInrTestDto,
    @CurrentUser() user,
  ) {
    const result = await this.inrTestService.update(id, updateInrTestDto, user);
    return { message: 'InrTest updated', result };
  }

  @ApiSuccessResponse()
  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser() user) {
    await this.inrTestService.remove(id, user);
    return { message: 'InrTest deleted' };
  }
}
