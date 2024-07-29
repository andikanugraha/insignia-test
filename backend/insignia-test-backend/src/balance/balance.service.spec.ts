import { Test, TestingModule } from '@nestjs/testing';
import { BalanceService } from './balance.service';
import { UsersModule } from 'src/users/users.module';
import { BalanceController } from './balance.controller';
import { JwtModule } from '@nestjs/jwt';

describe('BalanceService', () => {
  let service: BalanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, JwtModule],
      providers: [BalanceService],
      controllers: [BalanceController],
    }).compile();

    service = module.get<BalanceService>(BalanceService);
  });

  const expectedResult = {
    balance: 100,
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return balance', async () => {
    const result = await service.getBalance(13); // username: user10
    expect(result).toEqual(expectedResult);
  });
});
