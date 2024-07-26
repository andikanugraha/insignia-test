import { Test, TestingModule } from '@nestjs/testing';
import { TopTransactionsForUserService } from './top_transactions_for_user.service';

describe('TopTransactionsForUserService', () => {
  let service: TopTransactionsForUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopTransactionsForUserService],
    }).compile();

    service = module.get<TopTransactionsForUserService>(TopTransactionsForUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
