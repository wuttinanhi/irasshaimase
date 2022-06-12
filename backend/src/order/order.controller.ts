import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
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

  @Get('get')
  @UseGuards(JwtAuthGuard, AdminGuard)
  findOne(@Query('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Get('paginate')
  @UseGuards(JwtAuthGuard, AdminGuard)
  paginate(@Query('page') page: number, @Query('limit') limit: number) {
    return this.orderService.paginate(page, limit);
  }
}
