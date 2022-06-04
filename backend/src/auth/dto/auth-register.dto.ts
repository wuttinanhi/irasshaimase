import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthRegisterDto {
  @IsString()
  @Length(4, 255)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(8, 255)
  password: string;
}
