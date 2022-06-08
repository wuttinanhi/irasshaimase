import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EUserRole } from '../user-role.enum';

@Entity()
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ type: 'enum', enum: EUserRole, default: EUserRole.USER })
  role: EUserRole;
}
