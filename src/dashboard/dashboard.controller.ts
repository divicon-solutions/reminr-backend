import { Controller, Get, Param } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '@app/shared';
import { User } from '@app/prisma';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('member-data/:id')
  async getDashboardData(@CurrentUser() user: User, @Param('id') id: string) {
    return this.dashboardService.getDashboardData(user, id);
  }

  @Get('admin-data')
  async getAdminDashboardData(@CurrentUser() user: User) {
    return this.dashboardService.getAdminDashboardData(user);
  }
}
