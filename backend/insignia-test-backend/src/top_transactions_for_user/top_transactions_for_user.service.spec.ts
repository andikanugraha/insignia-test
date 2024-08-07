import { Test, TestingModule } from '@nestjs/testing';
import { TopTransactionsForUserService } from './top_transactions_for_user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TopTransactionsForUserController } from './top_transactions_for_user.controller';
import { JwtModule } from '@nestjs/jwt';

describe('TopTransactionsForUserService', () => {
  let service: TopTransactionsForUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, JwtModule],
      controllers: [TopTransactionsForUserController],
      providers: [TopTransactionsForUserService],
    }).compile();

    service = module.get<TopTransactionsForUserService>(
      TopTransactionsForUserService,
    );
  });

  const expectedResult = [];

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of transactions', async () => {
    const result = await service.getTopTransactionsForUser(13); // username: user10
    expect(result).toEqual(expectedResult);
  });
});
