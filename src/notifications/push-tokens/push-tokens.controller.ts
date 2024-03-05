import { Body, Controller, Delete, Post, Query } from '@nestjs/common';
import { PushTokensService } from './push-tokens.service';
import { PushTokenDto, CreatePushTokenDto } from '@app/prisma';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '@app/shared';

@ApiTags('push-tokens')
@Controller('push-tokens')
export class PushTokensController {
  constructor(private readonly pushTokensService: PushTokensService) {}

  @ApiResponse({ status: 201, type: PushTokenDto })
  @Post()
  create(@Body() createPushTokenDto: CreatePushTokenDto, @CurrentUser() user) {
    return this.pushTokensService.create(createPushTokenDto, user);
  }

  @ApiResponse({ status: 200, type: PushTokenDto })
  @Delete('unsubscribe')
  unsubscribe(@Query('token') token: string, @CurrentUser() user) {
    return this.pushTokensService.unsubscribe(token, user);
  }
}
