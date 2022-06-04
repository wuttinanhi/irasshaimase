import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  public generateAccessToken(user: User) {
    return this.jwtService.signAsync({
      id: user.id,
      email: user.email,
      name: user.name,
    });
  }

  public validateAccessToken(token: string) {
    return this.jwtService.verifyAsync(token);
  }
}
