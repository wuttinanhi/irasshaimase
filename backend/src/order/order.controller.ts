import { Body, Controller, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../auth/current-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../user-role/admin.guard';
import { User } from '../user/entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { EOrderStatus } from './order-status.enum';
import { OrderGetGuard } from './order.guard';
import { OrderService } from './order.service';

@Controller('api/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  create(@Body() createOrderDto: CreateOrderDto, @CurrentUser() user: User) {
    return this.orderService.create(user.id, createOrderDto);
  }

  @Patch('received')
  @UseGuards(JwtAuthGuard, OrderGetGuard)
  async received(@Query('id') id: number) {
    await this.orderService.updateOrderStatus(id, EOrderStatus.DELIVERED);
  }

  @Patch('admin/update')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async adminUpdate(@Query('id') id: number, @Body('status') status: EOrderStatus) {
    await this.orderService.updateOrderStatus(id, status);
  }
}
