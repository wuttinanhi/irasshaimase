import { Body, Controller, Delete, Get, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../auth/current-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../user/entities/user.entity';
import { CreateShippingAddressDto } from './dto/create-shipping-address.dto';
import { UpdateShippingAddressDto } from './dto/update-shipping-address.dto';
import { ShippingAddressGuard } from './shipping-address.guard';
import { ShippingAddressService } from './shipping-address.service';

@Controller('api/shipping-address')
export class ShippingAddressController {
  constructor(private readonly shippingAddressService: ShippingAddressService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateShippingAddressDto, @CurrentUser() user: User) {
    // create record
    const record = await this.shippingAddressService.create(user.id, dto);

    // if default is true update default
    if (record.default === true) {
      await this.shippingAddressService.setDefault(record.userId, record.id);
    }

    // return record
    return record;
  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  getAll(@CurrentUser() user: User) {
    return this.shippingAddressService.getAllUserShippingLocation(user.id);
  }

  @Patch('update')
  @UseGuards(JwtAuthGuard, ShippingAddressGuard)
  async update(@Query('id') id: string, @Body() dto: UpdateShippingAddressDto) {
    // update record
    await this.shippingAddressService.update(+id, dto);

    // get updated record
    const record = await this.shippingAddressService.getById(+id);

    // if default is true update default
    if (dto.default === true) {
      await this.shippingAddressService.setDefault(record.userId, record.id);
    }
  }

  @Delete('delete')
  @UseGuards(JwtAuthGuard, ShippingAddressGuard)
  async remove(@Query('id') id: string) {
    await this.shippingAddressService.remove(+id);
  }
}
