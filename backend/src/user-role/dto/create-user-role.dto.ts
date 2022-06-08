import { IsEnum, IsNumber, IsPositive } from 'class-validator';
import { EUserRole } from '../user-role.enum';

export class CreateUserRoleDto {
  @IsNumber()
  @IsPositive()
  userId: number;

  @IsEnum(EUserRole)
  role: EUserRole;
}
