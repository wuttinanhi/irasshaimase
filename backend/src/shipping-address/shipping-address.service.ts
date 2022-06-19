import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShippingAddressDto } from './dto/create-shipping-address.dto';
import { UpdateShippingAddressDto } from './dto/update-shipping-address.dto';
import { ShippingAddress } from './entities/shipping-address.entity';

@Injectable()
export class ShippingAddressService {
  constructor(
    @InjectRepository(ShippingAddress)
    private readonly repository: Repository<ShippingAddress>,
  ) {}

  async create(userId: number, dto: CreateShippingAddressDto) {
    const recordCount = await this.getShippingAddressCount(userId);
    if (recordCount > 10) {
      throw new ForbiddenException();
    }

    let record = this.repository.create(dto);
    record.userId = userId;
    record = await this.repository.save(record);

    return record;
  }

  async findOne(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  async getAllUserShippingLocation(userId: number) {
    return this.repository.find({ where: { userId } });
  }

  async update(id: number, dto: UpdateShippingAddressDto) {
    await this.repository.update({ id }, dto);
  }

  async remove(id: number) {
    const record = await this.findOne(id);
    return this.repository.remove(record);
  }

  async setDefault(userId: number, recordId: number) {
    // update all user record to false
    const records = await this.repository.find({ where: { userId: userId } });
    for (const record of records) {
      await this.update(record.id, { default: false });
    }

    // update default of target record to true
    const target = await this.findOne(recordId);
    await this.update(target.id, { default: true });
  }

  async getShippingAddressCount(userId: number) {
    return this.repository.count({ where: { userId } });
  }
}
