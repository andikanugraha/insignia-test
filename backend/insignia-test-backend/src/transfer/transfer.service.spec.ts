import { Test, TestingModule } from '@nestjs/testing';
import { TransferService } from './transfer.service';
import { TransferController } from './transfer.controller';
import { TransactionsModule } from 'src/transactions/transactions.module';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

describe('TransferService', () => {
  let service: TransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, TransactionsModule, JwtModule],
      controllers: [TransferController],
      providers: [TransferService],
    }).compile();

    service = module.get<TransferService>(TransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return true if success', async () => {
    const result = await service.transfer(5, 'user1', 100); // username: user3
    expect(result).toBeTruthy();
  });
});
