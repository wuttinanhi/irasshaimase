import { ConflictException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    // check if user exists
    const exists = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    // if user exists, return error
    if (exists) throw new ConflictException();

    const user = this.userRepository.create(createUserDto);
    const result = await this.userRepository.save(user);
    return result;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new ForbiddenException();
    return user;
  }

  async authenticate(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException();
    const validate = await compare(password, user.password);
    if (validate === true) return user;
    return null;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    const result = await this.userRepository.update(
      id,
      this.userRepository.create({
        ...user,
        ...updateUserDto,
      }),
    );

    return result;
  }

  async ___debugShowUserTable() {
    const users = await this.userRepository.find();
    // remove user password field
    users.map((user) => delete user.password);
    console.table(users);
  }
}
