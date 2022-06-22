import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from './admin.guard';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UserRoleService } from './user-role.service';

@Controller('api/user-role')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Post('set')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async set(@Body() createUserRoleDto: CreateUserRoleDto) {
    await this.userRoleService.setRole(createUserRoleDto.userId, createUserRoleDto.role);
  }

  @Get('get/:userId')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async get(@Param('userId') userId: number) {
    return this.userRoleService.getRole(userId);
  }
}
