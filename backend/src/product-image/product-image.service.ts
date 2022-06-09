import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import { Repository } from 'typeorm';
import { ProductImage } from './entities/product-image.entity';

@Injectable()
export class ProductImageService {
  private readonly logger: Logger = new Logger('ProductImageService');

  constructor(
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
  ) {}

  async create(productImage: ProductImage): Promise<ProductImage> {
    return this.productImageRepository.save(productImage);
  }

  async delete(id: number): Promise<void> {
    await this.productImageRepository.delete(id);
  }

  async getProductImages(productId: number) {
    const record = await this.productImageRepository.find({
      where: { productId },
    });
    return record.map((record) => record.imageUrl);
  }

  async deleteByProductId(productId: number): Promise<void> {
    const records = await this.productImageRepository.find({
      where: { productId },
    });

    for (const record of records) {
      try {
        // build absolute path
        const absolutePath = `${process.env.PRODUCT_IMAGE_DIRECTORY}/${record.imageName}`;

        // remove file
        fs.unlinkSync(absolutePath);

        // remove record
        await this.productImageRepository.remove(record);
      } catch (error) {
        // log error
        this.logger.error(
          `Failed to delete image of product #${record.productId} (${record.imageName})`,
        );
      }
    }
  }
}
