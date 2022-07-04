import { Test, TestingModule } from '@nestjs/testing';
import { OrderExtendController } from './order-extend.controller';
import { OrderExtendService } from './order-extend.service';

describe('OrderExtendController', () => {
  let controller: OrderExtendController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderExtendController],
      providers: [OrderExtendService],
    }).compile();

    controller = module.get<OrderExtendController>(OrderExtendController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
