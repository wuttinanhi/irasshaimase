import { ClassSerializerInterceptor, INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserService } from './user/user.service';

async function forceModify(app: INestApplication) {
  if (process.env.FORCE_MODIFY === 'false') return;
  if (process.env.FORCE_MODIFY === '0') return;

  // create logger
  const logger = new Logger('FORCE_MODIFY');

  // get service
  const userService = app.get(UserService);

  // show user table
  const showUserTable = process.env.FORCE_MODIFY_SHOW_USER_TABLE;
  if (showUserTable) {
    logger.warn('Showing user table');
    await userService.___debugShowUserTable();
  }

  // modify user data
  const userId: any = process.env.FORCE_MODIFY_USER_ID;
  const userPassword = process.env.FORCE_MODIFY_USER_PASSWORD;
  if (userId && userPassword) {
    logger.warn(`Force modify user #${userId}`);
    await userService.update(userId, { password: userPassword });
    logger.warn(`Successfully modify user #${userId}`);
  }

  // force shutdown
  const forceShutdown = process.env.FORCE_MODIFY_FORCE_SHUTDOWN;
  if (forceShutdown) {
    logger.warn('Force shutdown');
    process.exit(0);
  }
}

async function bootstrap() {
  // create app
  const app = await NestFactory.create(AppModule);

  // start force modify
  await forceModify(app);

  // get config service
  const configService = app.get(ConfigService);

  // apply global stuff
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // enable CORS
  // parse APP_CORS_ORIGIN to array
  const APP_CORS_ORIGIN = configService.get('APP_CORS_ORIGIN').split(',');
  // apply CORS
  app.enableCors({ origin: APP_CORS_ORIGIN });

  // enable gracefully shutdown
  app.enableShutdownHooks();

  // listen port
  await app.listen(3000);
}
bootstrap();
