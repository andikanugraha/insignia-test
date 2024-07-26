import { Test, TestingModule } from '@nestjs/testing';
import { TopTransactionsForUserController } from './top_transactions_for_user.controller';

describe('TopTransactionsForUserController', () => {
  let controller: TopTransactionsForUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopTransactionsForUserController],
    }).compile();

    controller = module.get<TopTransactionsForUserController>(
      TopTransactionsForUserController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
