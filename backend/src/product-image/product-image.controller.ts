import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  PayloadTooLargeException,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { DataSource } from 'typeorm';
import { CurrentUser } from '../auth/current-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../user-role/admin.guard';
import { User } from '../user/entities/user.entity';
import { ProductImage } from './entities/product-image.entity';
import { ProductImageService } from './product-image.service';

@Controller('api/product-image')
export class ProductImageController {
  constructor(private readonly productImageService: ProductImageService, private dataSource: DataSource) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Query('productId') productId: number,
    @CurrentUser() user: User,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // check file mimetype
      const allowedMimeTypes = ['image/jpeg', 'image/png'];
      for (const file of files) {
        if (allowedMimeTypes.includes(file.mimetype) === false) {
          throw new BadRequestException();
        }
      }

      // check image count of product
      const imageCount = await this.productImageService.countByProductId(productId);
      const totalImageCount = imageCount + files.length;
      if (totalImageCount > parseInt(process.env.PRODUCT_IMAGE_LIMIT, 10)) {
        throw new PayloadTooLargeException();
      }

      // looping files
      for (const file of files) {
        // create record
        const productImage = new ProductImage();
        productImage.imageMimeType = file.mimetype;
        productImage.imageName = file.filename;
        productImage.imageSize = file.size;
        productImage.imageUrl = `${process.env.PRODUCT_IMAGE_BASE_URL}/${file.filename}`;
        productImage.productId = productId;
        productImage.userId = user.id;
        // save record
        await this.productImageService.create(productImage);
      }

      // commit transaction
      await queryRunner.commitTransaction();
    } catch (err) {
      // rollback transaction
      await queryRunner.rollbackTransaction();
      // delete all uploaded files
      for (const file of files) fs.unlinkSync(file.path);
      // throw error
      throw new BadRequestException();
    } finally {
      // release query runner
      await queryRunner.release();
    }
  }

  @Get('get')
  async get(@Query('productId') productId: number) {
    return this.productImageService.getImageByProductId(productId);
  }

  @Delete('delete')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async delete(@Query('productId') productId: number) {
    await this.productImageService.deleteByProductId(productId);
  }
}
