import { Test, TestingModule } from '@nestjs/testing';
import { ShippingAddressController } from './shipping-address.controller';
import { ShippingAddressService } from './shipping-address.service';

describe('ShippingAddressController', () => {
  let controller: ShippingAddressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShippingAddressController],
      providers: [ShippingAddressService],
    }).compile();

    controller = module.get<ShippingAddressController>(ShippingAddressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
