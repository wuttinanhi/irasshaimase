import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AuthUser } from '../auth/auth-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async user(@AuthUser() user: User) {
    return user;
  }

  @Patch('/update')
  @UseGuards(JwtAuthGuard)
  async update(@AuthUser() user: User, @Body() dto: UpdateUserProfileDto) {
    await this.userService.update(user.id, dto);
  }
}
