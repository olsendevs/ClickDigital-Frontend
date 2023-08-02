import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles, RolesGuard } from 'src/auth/jwt/role.guard';

@Controller('health-check')
export class HealthCheckController {
  @Get('')
  check() {
    return `The application is running - ${new Date().toISOString()}`;
  }
  @UseGuards(RolesGuard)
  @Roles('default')
  @Get('auth')
  checkAuth() {
    return `The application is running - ${new Date().toISOString()}`;
  }
}
