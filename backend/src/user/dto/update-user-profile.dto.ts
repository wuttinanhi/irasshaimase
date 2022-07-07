import { IsString, Length } from 'class-validator';

export class UpdateUserProfileDto {
  @IsString()
  @Length(4, 255)
  name: string;
}
