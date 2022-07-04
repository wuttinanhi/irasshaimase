import { Controller, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OrderService } from '../order/order.service';
import { AdminGuard } from '../user-role/admin.guard';
import { OrderExtendService } from './order-extend.service';

@Controller('api/order')
export class OrderExtendController {
  constructor(private readonly orderExtendService: OrderExtendService, private readonly orderService: OrderService) {}

  @Post('admin/cancel')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async adminCancel(@Query('id') id: number) {
    await this.orderExtendService.cancel(id);
  }
}
