import { Test, TestingModule } from '@nestjs/testing';
import { OrderExtendService } from './order-extend.service';

describe('OrderExtendService', () => {
  let service: OrderExtendService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderExtendService],
    }).compile();

    service = module.get<OrderExtendService>(OrderExtendService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
