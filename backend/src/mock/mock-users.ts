import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';

const MOCK_USER: CreateUserDto[] = [
  {
    name: 'Admin',
    email: 'admin@example.com',
    password: 'admin',
  },
  {
    name: 'User',
    email: 'user@example.com',
    password: 'user',
  },
  {
    name: 'Guest',
    email: 'guest@example.com',
    password: 'guest',
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'john',
  },
];

async function mockUsers() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: false,
  });

  const userService = app.get(UserService);

  for (const user of MOCK_USER) {
    await userService.create(user);
  }

  // close the app
  await app.close();
}

mockUsers();
