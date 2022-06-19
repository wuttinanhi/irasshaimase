import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { ShippingAddressService } from './shipping-address.service';

@Injectable()
export class ShippingAddressGuard implements CanActivate {
  constructor(private readonly shippingAddressService: ShippingAddressService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user ?? null;
    if (!user) throw new UnauthorizedException();

    const id = request.query.id;
    const record = await this.shippingAddressService.getById(id);

    if (!record) throw new NotFoundException();
    if (record.userId === user.id) return true;

    throw new ForbiddenException();
  }
}
