import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { CreateProductDto } from '../product/dto/create-product.dto';
import { ProductService } from '../product/product.service';

const MOCK_PRODUCTS: CreateProductDto[] = [
  {
    name: 'Product 1',
    description: 'Description 1',
    price: 10,
    image: 'https://via.placeholder.com/300',
    stock: 10,
  },
  {
    name: 'Product 2',
    description: 'Description 2',
    price: 20,
    image: 'https://via.placeholder.com/300',
    stock: 20,
  },
  {
    name: 'Product 3',
    description: 'Description 3',
    price: 30,
    image: 'https://via.placeholder.com/300',
    stock: 30,
  },
  {
    name: 'Product 4',
    description: 'Description 4',
    price: 40,
    image: 'https://via.placeholder.com/300',
    stock: 40,
  },
  {
    name: 'Product 5',
    description: 'Description 5',
    price: 50,
    image: 'https://via.placeholder.com/300',
    stock: 0,
  },
];

async function mockProducts() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: false,
  });

  const productService = app.get(ProductService);

  for (const product of MOCK_PRODUCTS) {
    await productService.create(product);
  }

  // close the app
  await app.close();
}

mockProducts();
