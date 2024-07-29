import { Test, TestingModule } from '@nestjs/testing';
import { MyTransactionsController } from './my_transactions.controller';
import { MyTransactionsService } from './my_transactions.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

describe('MyTransactionsController', () => {
  let controller: MyTransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, JwtModule],
      providers: [MyTransactionsService],
      controllers: [MyTransactionsController],
    }).compile();

    controller = module.get<MyTransactionsController>(MyTransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
