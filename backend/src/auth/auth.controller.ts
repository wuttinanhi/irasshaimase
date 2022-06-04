import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthUser } from './auth-user.decorator';
import { AuthService } from './auth.service';
import { AuthChangePasswordDto } from './dto/auth-change-password.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() dto: AuthLoginDto) {
    const user = await this.userService.authenticate(dto.email, dto.password);
    if (!user) throw new UnauthorizedException();
    const accessToken = await this.authService.generateAccessToken(user);
    return { accessToken };
  }

  @Post('register')
  async register(@Body() dto: AuthRegisterDto) {
    const user = await this.userService.create(dto);
    if (!user) throw new InternalServerErrorException();
  }

  @Post('changepassword')
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @AuthUser() user: User,
    @Body() dto: AuthChangePasswordDto,
  ) {
    const authUser = await this.userService.authenticate(
      user.email,
      dto.password,
    );

    if (!authUser) throw new UnauthorizedException();

    await this.userService.update(authUser.id, { password: dto.newPassword });
  }
}
