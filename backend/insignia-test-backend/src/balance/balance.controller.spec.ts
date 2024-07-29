import { Test, TestingModule } from '@nestjs/testing';
import { BalanceController } from './balance.controller';
import { UsersModule } from 'src/users/users.module';
import { BalanceService } from './balance.service';

describe('BalanceController', () => {
  let controller: BalanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
      providers: [BalanceService],
      controllers: [BalanceController],
    }).compile();

    controller = module.get<BalanceController>(BalanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
