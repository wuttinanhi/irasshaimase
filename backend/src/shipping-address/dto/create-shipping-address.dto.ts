import { OmitType } from '@nestjs/mapped-types';
import { ShippingAddress } from '../entities/shipping-address.entity';

export class CreateShippingAddressDto extends OmitType(ShippingAddress, ['id', 'userId']) {}
