import { Test, TestingModule } from '@nestjs/testing';
import { TransferController } from './transfer.controller';
import { UsersModule } from 'src/users/users.module';
import { TransactionsModule } from 'src/transactions/transactions.module';
import { TransferService } from './transfer.service';
import { JwtModule } from '@nestjs/jwt';

describe('TransferController', () => {
  let controller: TransferController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, TransactionsModule, JwtModule],
      controllers: [TransferController],
      providers: [TransferService],
    }).compile();

    controller = module.get<TransferController>(TransferController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
