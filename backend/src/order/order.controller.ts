import { Body, Controller, ForbiddenException, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../auth/current-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../user-role/admin.guard';
import { User } from '../user/entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';

@Controller('api/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  create(@Body() createOrderDto: CreateOrderDto, @CurrentUser() user: User) {
    return this.orderService.create(user.id, createOrderDto);
  }

  @Get('admin/get')
  @UseGuards(JwtAuthGuard, AdminGuard)
  adminGet(@Query('id') id: number) {
    return this.orderService.findOne(id);
  }

  @Get('admin/paginate')
  @UseGuards(JwtAuthGuard, AdminGuard)
  adminPaginate(@Query('page') page: number, @Query('limit') limit: number, @Query('userId') userId: number) {
    return this.orderService.paginate(page, limit, userId);
  }

  @Get('paginate')
  @UseGuards(JwtAuthGuard)
  paginate(@CurrentUser() user: User, @Query('page') page: number, @Query('limit') limit: number) {
    return this.orderService.paginate(page, limit, user.id);
  }

  @Get('get')
  @UseGuards(JwtAuthGuard)
  async get(@CurrentUser() user: User, @Query('id') id: number) {
    const order = await this.orderService.findOne(id);
    if (order.userId !== user.id) throw new ForbiddenException();
    return order;
  }
}
