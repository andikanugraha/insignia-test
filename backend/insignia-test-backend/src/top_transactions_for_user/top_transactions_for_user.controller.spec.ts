import { Test, TestingModule } from '@nestjs/testing';
import { TopTransactionsForUserController } from './top_transactions_for_user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TopTransactionsForUserService } from './top_transactions_for_user.service';
import { JwtModule } from '@nestjs/jwt';

describe('TopTransactionsForUserController', () => {
  let controller: TopTransactionsForUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, JwtModule],
      controllers: [TopTransactionsForUserController],
      providers: [TopTransactionsForUserService],
    }).compile();

    controller = module.get<TopTransactionsForUserController>(
      TopTransactionsForUserController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
