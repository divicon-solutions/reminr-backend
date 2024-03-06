import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationDto, CreateNotificationDto } from '@app/prisma';
import { CurrentUser } from '@app/shared';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @ApiResponse({ status: 201, type: NotificationDto })
  @ApiQuery({ name: 'isSilent', required: false })
  @Post()
  create(
    @Body() createNotificationDto: CreateNotificationDto,
    @CurrentUser() user,
    @Query('isSilent', new DefaultValuePipe(false)) isSilent?: boolean,
  ) {
    return this.notificationsService.create(
      createNotificationDto,
      user,
      isSilent,
    );
  }

  @Get()
  findAll(@CurrentUser() user) {
    return this.notificationsService.findAll(user);
  }
}
