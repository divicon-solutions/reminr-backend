import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, User, UserDto } from '@app/prisma';
import { ApiTags } from '@nestjs/swagger';
import { ApiSuccessResponse, CurrentUser, IsPublic } from '@app/shared';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @IsPublic()
  @ApiSuccessResponse(UserDto, { status: 201 })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.usersService.create(createUserDto);
    return { message: 'User created successfully', result };
  }

  @Get()
  findAll(@CurrentUser() user: User) {
    return this.usersService.findAll(user);
  }

  @Get('me')
  findMe(@CurrentUser() user: User) {
    return this.usersService.findOne(user.id, user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: User) {
    return this.usersService.findOne(id, user);
  }

  @ApiSuccessResponse(UserDto)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() user: User,
  ) {
    const result = await this.usersService.update(id, updateUserDto, user);
    return { message: 'User updated successfully', result };
  }

  @ApiSuccessResponse()
  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser() user: User) {
    await this.usersService.remove(id, user);
    return { message: 'User deleted successfully' };
  }
}
