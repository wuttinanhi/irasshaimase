import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { CurrentUser } from '../auth/current-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../user-role/admin.guard';
import { User } from '../user/entities/user.entity';
import { ProductImage } from './entities/product-image.entity';
import { ProductImageService } from './product-image.service';

@Controller('api/product-image')
export class ProductImageController {
  constructor(private readonly productImageService: ProductImageService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Query('productId') productId: number,
    @CurrentUser() user: User,
  ) {
    const uploadedFilePaths = [];
    const recordArray: ProductImage[] = [];

    try {
      for (const file of files) {
        // check file mimetype
        if (
          (file.mimetype === 'image/jpeg') === false &&
          (file.mimetype === 'image/png') === false
        ) {
          // push to array
          uploadedFilePaths.push(file.path);

          // throw error
          throw new BadRequestException();
        }

        // get file extension
        const fileExtension = file.mimetype.split('/').pop();

        // define file save path
        const fileName = `${file.filename}.${fileExtension}`;
        const fileSavePath = `${file.destination}/${fileName}`;

        // rename file
        fs.renameSync(file.path, fileSavePath);

        // create record
        const productImage = new ProductImage();
        productImage.imageMimeType = file.mimetype;
        productImage.imageName = fileName;
        productImage.imageSize = file.size;
        productImage.imageUrl = `${process.env.PRODUCT_IMAGE_BASE_URL}/${fileName}`;
        productImage.productId = productId;
        productImage.userId = user.id;

        // push record
        recordArray.push(productImage);

        // push to array
        uploadedFilePaths.push(fileSavePath);
      }

      // save records
      for (const record of recordArray) {
        await this.productImageService.create(record);
      }
    } catch (error) {
      // delete all uploaded files
      for (const filePath of uploadedFilePaths) {
        fs.unlinkSync(filePath);
      }

      // throw error
      throw new BadRequestException();
    }
  }

  @Get('get')
  async get(@Query('productId') productId: number) {
    return this.productImageService.getProductImages(productId);
  }

  @Delete('delete')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async delete(@Query('productId') productId: number) {
    await this.productImageService.deleteByProductId(productId);
  }
}
