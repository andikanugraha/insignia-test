import { Test, TestingModule } from '@nestjs/testing';
import { MyTransactionsController } from './my_transactions.controller';

describe('MyTransactionsController', () => {
  let controller: MyTransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MyTransactionsController],
    }).compile();

    controller = module.get<MyTransactionsController>(MyTransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
