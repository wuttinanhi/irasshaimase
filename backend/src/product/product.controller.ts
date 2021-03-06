import { Body, Controller, Delete, Get, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../user-role/admin.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductPaginationOptions } from './product.pagination';
import { ProductService } from './product.service';

@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard, AdminGuard)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get('get')
  findOne(@Query('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch('update')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async update(@Query('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    await this.productService.update(+id, updateProductDto);
  }

  @Delete('delete')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async remove(@Query('id') id: string) {
    await this.productService.remove(+id);
  }

  @Get('paginate')
  paginate(@Query() pagination: ProductPaginationOptions) {
    return this.productService.paginate(pagination);
  }
}
