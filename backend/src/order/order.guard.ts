import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { OrderService } from './order.service';

@Injectable()
export class OrderGetGuard implements CanActivate {
  constructor(private readonly orderService: OrderService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user ?? null;
    if (!user) throw new UnauthorizedException();

    const orderId = request.query.id;
    const order = await this.orderService.findOne(orderId);

    if (order.userId === user.id) return true;

    throw new ForbiddenException();
  }
}
