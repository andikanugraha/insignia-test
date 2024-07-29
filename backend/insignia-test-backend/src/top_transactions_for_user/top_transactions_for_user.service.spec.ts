import { Test, TestingModule } from '@nestjs/testing';
import { TopTransactionsForUserService } from './top_transactions_for_user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TopTransactionsForUserController } from './top_transactions_for_user.controller';

describe('TopTransactionsForUserService', () => {
  let service: TopTransactionsForUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [TopTransactionsForUserController],
      providers: [TopTransactionsForUserService],
    }).compile();

    service = module.get<TopTransactionsForUserService>(
      TopTransactionsForUserService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
