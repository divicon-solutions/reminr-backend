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
import { CallbackRequestService } from './callback-request.service';
import {
  CallbackRequestDto,
  CreateCallbackRequestDto,
  UpdateCallbackRequestDto,
} from '@app/prisma';
import { ApiSuccessResponse, CurrentUser } from '@app/shared';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('callback-request')
@Controller('callback-request')
export class CallbackRequestController {
  constructor(
    private readonly callbackRequestService: CallbackRequestService,
  ) {}

  @ApiSuccessResponse(CallbackRequestDto, { status: 201 })
  @Post()
  async create(
    @Body() createCallbackRequestDto: CreateCallbackRequestDto,
    @CurrentUser() user,
  ) {
    const result = await this.callbackRequestService.create(
      createCallbackRequestDto,
      user,
    );
    return { message: 'CallbackRequest created', result };
  }

  @ApiQuery({ name: 'userId', required: false })
  @Get()
  findAll(@CurrentUser() user, @Query('userId') userId?: string) {
    return this.callbackRequestService.findAll(user, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user) {
    return this.callbackRequestService.findOne(id, user);
  }

  @ApiSuccessResponse(CallbackRequestDto)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCallbackRequestDto: UpdateCallbackRequestDto,
    @CurrentUser() user,
  ) {
    const result = await this.callbackRequestService.update(
      id,
      updateCallbackRequestDto,
      user,
    );
    return { message: 'CallbackRequest updated', result };
  }

  @ApiSuccessResponse()
  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser() user) {
    await this.callbackRequestService.remove(id, user);
    return { message: 'CallbackRequest deleted' };
  }
}
