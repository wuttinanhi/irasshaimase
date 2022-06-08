import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { UserRole } from './entities/user-role.entity';
import { EUserRole } from './user-role.enum';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
    private readonly userService: UserService,
  ) {}

  async findOne(userId: number): Promise<UserRole> {
    const record = await this.userRoleRepository.findOne({
      where: { userId: userId },
    });
    if (!record) return this.userRoleRepository.create();
    return record;
  }

  async setRole(userId: number, role: EUserRole) {
    const user = await this.userService.findOne(userId);
    const record = await this.findOne(userId);
    record.role = role;
    record.userId = user.id;
    await this.userRoleRepository.save(record);
  }

  async getRole(userId: number) {
    const record = await this.findOne(userId);
    return record.role;
  }
}
