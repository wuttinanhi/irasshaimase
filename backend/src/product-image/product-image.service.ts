import { Injectable, Logger, NotFoundException } from '@nestjs/common';
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

  private getFilePath(record: ProductImage): string {
    return `${process.env.PRODUCT_IMAGE_DIRECTORY}/${record.imageName}`;
  }

  async findOne(id: number): Promise<ProductImage> {
    const record = await this.productImageRepository.findOne({ where: { id } });
    if (!record) throw new NotFoundException();
    return record;
  }

  async countByProductId(productId: number): Promise<number> {
    return await this.productImageRepository.count({ where: { productId } });
  }

  async create(productImage: ProductImage): Promise<ProductImage> {
    return this.productImageRepository.save(productImage, {
      transaction: true,
    });
  }

  async delete(id: number): Promise<void> {
    // get record
    const record = await this.findOne(id);
    // get file path
    const filePath = this.getFilePath(record);
    // remove file
    fs.unlinkSync(filePath);
    // delete record
    await this.productImageRepository.delete(id);
  }

  async getImageByProductId(productId: number) {
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
      let absolutePath: string;
      try {
        // build absolute path of file
        absolutePath = this.getFilePath(record);
        // remove file
        fs.unlinkSync(absolutePath);
        // remove record
        await this.productImageRepository.remove(record);
      } catch (error) {
        if (error.code === 'ENOENT') {
          // file not found
          // remove record
          await this.productImageRepository.remove(record);
        } else {
          // log error
          this.logger.error(`Failed to delete image of product #${record.productId} (${absolutePath})`);
        }
      }
    }
  }
}
