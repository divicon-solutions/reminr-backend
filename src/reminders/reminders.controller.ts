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
import { RemindersService } from './reminders.service';
import { CreateReminderDto, UpdateReminderDto, Reminder } from '@app/prisma';
import { ApiSuccessResponse, CurrentUser } from '@app/shared';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('reminders')
@Controller('reminders')
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  @ApiSuccessResponse(Reminder, { status: 201 })
  @Post()
  async create(
    @Body() createReminderDto: CreateReminderDto,
    @CurrentUser() user,
  ) {
    const result = await this.remindersService.create(createReminderDto, user);
    return { message: 'Reminder created', result };
  }

  @Get()
  findAll(@CurrentUser() user, @Query('date') date: Date) {
    return this.remindersService.findAll(user, date);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user) {
    return this.remindersService.findOne(id, user);
  }

  @ApiSuccessResponse(Reminder)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReminderDto: UpdateReminderDto,
    @CurrentUser() user,
  ) {
    const result = await this.remindersService.update(
      id,
      updateReminderDto,
      user,
    );
    return { message: 'Reminder updated', result };
  }

  @ApiSuccessResponse()
  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser() user) {
    await this.remindersService.remove(id, user);
    return { message: 'Reminder deleted' };
  }
}
