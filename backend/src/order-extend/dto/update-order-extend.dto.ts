import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderExtendDto } from './create-order-extend.dto';

export class UpdateOrderExtendDto extends PartialType(CreateOrderExtendDto) {}
