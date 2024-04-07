import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { GiftCardTypeService } from './gift-card-type.service';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateGiftCardTypeDto,
  GiftCardTypeDto,
  UpdateGiftCardTypeDto,
} from '@app/prisma';
import { ApiSuccessResponse, CurrentUser } from '@app/shared';

@ApiTags('gift-card-type')
@Controller('gift-card-type')
export class GiftCardTypeController {
  constructor(private readonly giftCardTypeService: GiftCardTypeService) {}

  @ApiSuccessResponse(GiftCardTypeDto, { status: 201 })
  @Post()
  async create(
    @Body() createGiftCardTypeDto: CreateGiftCardTypeDto,
    @CurrentUser() user,
  ) {
    const result = await this.giftCardTypeService.create(
      createGiftCardTypeDto,
      user,
    );
    return { message: 'Gift card type created successfully', result };
  }

  @Get()
  findAll(@CurrentUser() user) {
    return this.giftCardTypeService.findAll(user);
  }

  @Get(':id')
  findOne(@CurrentUser() user, @Param('id') id: string) {
    return this.giftCardTypeService.findOne(id, user);
  }

  @ApiSuccessResponse(GiftCardTypeDto)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGiftCardTypeDto: UpdateGiftCardTypeDto,
    @CurrentUser() user,
  ) {
    const result = await this.giftCardTypeService.update(
      id,
      updateGiftCardTypeDto,
      user,
    );
    return { message: 'Gift card type updated successfully', result };
  }

  @ApiSuccessResponse()
  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser() user) {
    const result = await this.giftCardTypeService.remove(id, user);
    return { message: 'Gift card type deleted successfully', result };
  }
}
