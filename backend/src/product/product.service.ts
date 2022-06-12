import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagination } from '../pagination/pagination';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

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
    // left join product and product_image
    return this.productRepository
      .createQueryBuilder('product')
      .select([
        'product.id AS id',
        'product.name AS name',
        'product.description AS description',
        'product.price AS price',
        'product_image.imageUrl AS image',
      ])
      .leftJoin('product_image', 'product_image', 'product.id = product_image.productId')
      .groupBy('product.id')
      .getRawMany();
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

  paginate(page: number, limit: number) {
    const queryBuilder = this.productRepository.createQueryBuilder('product');
    const pagination = new Pagination(queryBuilder);
    return pagination.paginate(page, limit);
  }
}
