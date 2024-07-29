import { Test, TestingModule } from '@nestjs/testing';
import { TopupService } from './topup.service';
import { TopupController } from './topup.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

describe('TopupService', () => {
  let service: TopupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, JwtModule],
      controllers: [TopupController],
      providers: [TopupService],
    }).compile();

    service = module.get<TopupService>(TopupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return true if success', async () => {
    const result = await service.balanceTopup(5, 100);
    expect(result).toBeTruthy();
  });
});
