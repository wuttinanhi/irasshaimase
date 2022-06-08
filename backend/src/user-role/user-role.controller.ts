import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UserRoleService } from './user-role.service';

@Controller('api/user-role')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Post('set')
  async set(@Body() createUserRoleDto: CreateUserRoleDto) {
    await this.userRoleService.setRole(
      createUserRoleDto.userId,
      createUserRoleDto.role,
    );
  }

  @Get('get/:userId')
  async get(@Param('userId') userId: number) {
    return this.userRoleService.getRole(userId);
  }
}
