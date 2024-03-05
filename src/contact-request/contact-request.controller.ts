import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ContactRequestService } from './contact-request.service';
import {
  ContactRequestDto,
  CreateContactRequestDto,
  UpdateContactRequestDto,
} from '@app/prisma';
import { ApiSuccessResponse, CurrentUser, IsPublic } from '@app/shared';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('contact-request')
@Controller('contact-request')
export class ContactRequestController {
  constructor(private readonly contactRequestService: ContactRequestService) {}

  @ApiSuccessResponse(ContactRequestDto, { status: 201 })
  @IsPublic()
  @Post()
  async create(@Body() createContactRequestDto: CreateContactRequestDto) {
    const result = await this.contactRequestService.create(
      createContactRequestDto,
    );
    return { message: 'ContactRequest created', result };
  }

  @Get()
  findAll(@CurrentUser() user) {
    return this.contactRequestService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user) {
    return this.contactRequestService.findOne(id, user);
  }

  @ApiSuccessResponse(ContactRequestDto)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateContactRequestDto: UpdateContactRequestDto,
    @CurrentUser() user,
  ) {
    const result = await this.contactRequestService.update(
      id,
      updateContactRequestDto,
      user,
    );
    return { message: 'ContactRequest updated', result };
  }

  @ApiSuccessResponse()
  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser() user) {
    await this.contactRequestService.remove(id, user);
    return { message: 'ContactRequest deleted' };
  }
}
