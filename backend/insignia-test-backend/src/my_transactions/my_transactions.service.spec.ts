import { Test, TestingModule } from '@nestjs/testing';
import { MyTransactionsService } from './my_transactions.service';

describe('MyTransactionsService', () => {
  let service: MyTransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyTransactionsService],
    }).compile();

    service = module.get<MyTransactionsService>(MyTransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
