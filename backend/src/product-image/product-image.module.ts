import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImage } from './entities/product-image.entity';
import { ProductImageController } from './product-image.controller';
import { ProductImageService } from './product-image.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        dest: configService.get('PRODUCT_IMAGE_DIRECTORY'),
      }),
    }),
    TypeOrmModule.forFeature([ProductImage]),
  ],
  controllers: [ProductImageController],
  providers: [ProductImageService],
  exports: [ProductImageService],
})
export class ProductImageModule {}
