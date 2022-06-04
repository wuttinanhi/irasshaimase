import { IsString, Length } from 'class-validator';

export class AuthChangePasswordDto {
  @IsString()
  @Length(8, 255)
  password: string;

  @IsString()
  @Length(8, 255)
  newPassword: string;
}
