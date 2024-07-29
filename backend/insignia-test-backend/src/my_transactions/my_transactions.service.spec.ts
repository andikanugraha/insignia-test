import { Test, TestingModule } from '@nestjs/testing';
import { MyTransactionsService } from './my_transactions.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MyTransactionsController } from './my_transactions.controller';
import { JwtModule } from '@nestjs/jwt';

describe('MyTransactionsService', () => {
  let service: MyTransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, JwtModule],
      providers: [MyTransactionsService],
      controllers: [MyTransactionsController],
    }).compile();

    service = module.get<MyTransactionsService>(MyTransactionsService);
  });

  const expectedResult = {
    data: [],
    total: 0,
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of transactions', async () => {
    const result = await service.getTransactions(13); // username: user10
    expect(result).toEqual(expectedResult);
  });
});
