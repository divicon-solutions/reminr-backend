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
import { RedeemsService } from './redeems.service';
import { RedeemDto, CreateRedeemDto, UpdateRedeemDto } from '@app/prisma';
import { ApiSuccessResponse, CurrentUser } from '@app/shared';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('redeems')
@Controller('redeems')
export class RedeemsController {
  constructor(private readonly redeemsService: RedeemsService) {}

  @ApiSuccessResponse(RedeemDto, { status: 201 })
  @Post()
  async create(@Body() createRedeemDto: CreateRedeemDto, @CurrentUser() user) {
    const result = await this.redeemsService.create(createRedeemDto, user);
    return { message: 'Redeem created', result };
  }

  @ApiQuery({ name: 'userId', required: false })
  @Get()
  findAll(@CurrentUser() user, @Query('userId') userId?: string) {
    return this.redeemsService.findAll(user, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user) {
    return this.redeemsService.findOne(id, user);
  }

  @ApiSuccessResponse(RedeemDto)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRedeemDto: UpdateRedeemDto,
    @CurrentUser() user,
  ) {
    const result = await this.redeemsService.update(id, updateRedeemDto, user);
    return { message: 'Redeem updated', result };
  }

  @ApiSuccessResponse()
  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser() user) {
    await this.redeemsService.remove(id, user);
    return { message: 'Redeem deleted' };
  }
}
