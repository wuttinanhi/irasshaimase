import { Injectable, NotFoundException } from '@nestjs/common';
import { OmitType } from '@nestjs/mapped-types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

export class ProductWithImage extends OmitType(Product, ['image']) {
  thumbnailImage: string;
  images: string[];
}

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    await this.productRepository.save(product);
    return product;
  }

  async findAll() {
    // response temp store
    const response = {};

    // left join product and product_image
    const records = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product_image', 'product_image', 'product.id = product_image.productId')
      .getRawMany();

    // loop through records
    for (const record of records) {
      // product id
      const productId = record['product_id'];
      // previos payload
      const previousPayload: ProductWithImage = response[productId] ?? new ProductWithImage();
      // previous payload images
      const previosPayloadImage = previousPayload.images ?? [];

      // build payload { ...record, images: [...previosPayloadImage] }
      const payload: ProductWithImage = previousPayload;
      // set property of new payload
      payload.id = productId;
      payload.name = record['product_name'];
      payload.description = record['product_description'];
      payload.price = record['product_price'];
      payload.stock = record['product_stock'];
      payload.images = previosPayloadImage;
      // add image to payload
      payload.images = [...previosPayloadImage];
      if (record['product_image_imageUrl']) payload.images.push(record['product_image_imageUrl']);
      // set payload thumbnail image
      payload.thumbnailImage = payload.images[0];

      // add to temp store
      response[productId] = payload as ProductWithImage;
    }

    // return only value of response object
    return Object.values(response) as ProductWithImage[];
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundException();
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({ where: { id } });
    await this.productRepository.update(id, updateProductDto);
    return product;
  }

  async remove(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    await this.productRepository.remove(product);
    return product;
  }

  async isProductAvailable(id: number, quantity = 1) {
    const product = await this.findOne(id);
    if (!product) return false;
    return product.stock >= quantity;
  }

  async setProductStock(id: number, amount: number) {
    const product = await this.update(id, { stock: amount });
    return product;
  }

  async removeProductStock(id: number, take: number) {
    const product = await this.findOne(id);
    const update = await this.setProductStock(id, product.stock - take);
    return update;
  }
}
