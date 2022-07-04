import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../auth/current-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OrderGetGuard } from '../order/order.guard';
import { OrderPaginationOptions } from '../order/order.pagination';
import { OrderService } from '../order/order.service';
import { AdminGuard } from '../user-role/admin.guard';
import { User } from '../user/entities/user.entity';
import { OrderExtendService } from './order-extend.service';

@Controller('api/order')
export class OrderExtendController {
  constructor(private readonly orderExtendService: OrderExtendService, private readonly orderService: OrderService) {}

  @Post('admin/cancel')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async adminCancel(@Query('id') id: number) {
    await this.orderExtendService.cancel(id);
  }

  @Get('paginate')
  @UseGuards(JwtAuthGuard)
  async paginate(@CurrentUser() user: User, @Query() pagination: OrderPaginationOptions) {
    const result = await this.orderService.paginate({ ...pagination, userId: user.id });
    const orders = await Promise.all(
      result.items.map(async (order) => this.orderExtendService.populateOrder(order, { user: true })),
    );
    return { ...result, items: orders };
  }

  @Get('get')
  @UseGuards(JwtAuthGuard, OrderGetGuard)
  async get(@Query('id') id: number) {
    const order = await this.orderService.findOne(id);
    return this.orderExtendService.populateOrder(order, { user: true });
  }

  @Get('report')
  @UseGuards(JwtAuthGuard, OrderGetGuard)
  async report(@Query('id') id: number) {
    const report = await this.orderService.report(id);
    return this.orderExtendService.populateOrder(report, { user: true, payment: true });
  }

  @Get('admin/get')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async adminGet(@Query('id') id: number) {
    const order = await this.orderService.findOne(id);
    return this.orderExtendService.populateOrder(order, { user: true });
  }

  @Get('admin/paginate')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async adminPaginate(@Query() pagination: OrderPaginationOptions) {
    const result = await this.orderService.paginate(pagination);
    const orders = await Promise.all(
      result.items.map(async (order) => this.orderExtendService.populateOrder(order, { user: true })),
    );
    return { ...result, items: orders };
  }
}
