import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class UserLoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(8, 255)
  password: string;
}
