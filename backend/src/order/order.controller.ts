import { Body, Controller, Get, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../auth/current-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../user-role/admin.guard';
import { User } from '../user/entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { EOrderStatus } from './order-status.enum';
import { OrderGetGuard } from './order.guard';
import { OrderPaginationOptions } from './order.pagination';
import { OrderService } from './order.service';

@Controller('api/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  create(@Body() createOrderDto: CreateOrderDto, @CurrentUser() user: User) {
    return this.orderService.create(user.id, createOrderDto);
  }

  @Get('paginate')
  @UseGuards(JwtAuthGuard)
  paginate(@CurrentUser() user: User, @Query() pagination: OrderPaginationOptions) {
    return this.orderService.paginate({ ...pagination, userId: user.id });
  }

  @Get('get')
  @UseGuards(JwtAuthGuard, OrderGetGuard)
  async get(@Query('id') id: number) {
    const order = await this.orderService.findOne(id);
    return order;
  }

  @Get('report')
  @UseGuards(JwtAuthGuard, OrderGetGuard)
  async report(@Query('id') id: number) {
    return this.orderService.report(id);
  }

  @Patch('received')
  @UseGuards(JwtAuthGuard, OrderGetGuard)
  async received(@Query('id') id: number) {
    await this.orderService.updateOrderStatus(id, EOrderStatus.DELIVERED);
  }

  @Get('admin/get')
  @UseGuards(JwtAuthGuard, AdminGuard)
  adminGet(@Query('id') id: number) {
    return this.orderService.findOne(id);
  }

  @Get('admin/paginate')
  @UseGuards(JwtAuthGuard, AdminGuard)
  adminPaginate(@Query() pagination: OrderPaginationOptions) {
    return this.orderService.paginate(pagination);
  }

  @Patch('admin/update')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async adminUpdate(@Query('id') id: number, @Body('status') status: EOrderStatus) {
    await this.orderService.updateOrderStatus(id, status);
  }

  @Post('admin/cancel')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async adminCancel(@Query('id') id: number) {
    await this.orderService.cancel(id);
  }
}
